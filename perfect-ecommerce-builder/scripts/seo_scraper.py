import requests
from bs4 import BeautifulSoup
import json
import sys
import re

def scrape_seo(urls):
    results = {}
    for url in urls:
        if not url.startswith('http'):
            url = 'https://' + url
            
        try:
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
            response = requests.get(url, headers=headers, timeout=10)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.text, 'html.parser')
            
            data = {
                'title': soup.title.string.strip() if soup.title else 'N/A',
                'meta_description': '',
                'h1': [h1.get_text().strip() for h1 in soup.find_all('h1')],
                'h2': [h2.get_text().strip() for h2 in soup.find_all('h2')],
                'keywords': []
            }
            
            # Extract meta description
            desc = soup.find('meta', attrs={'name': 'description'}) or soup.find('meta', attrs={'property': 'og:description'})
            if desc:
                data['meta_description'] = desc.get('content', '').strip()
            
            # Extract meta keywords (old school but some still use it)
            keyw = soup.find('meta', attrs={'name': 'keywords'})
            if keyw:
                data['keywords'] = [k.strip() for k in keyw.get('content', '').split(',')]
            
            # Simple keyword frequency on main text
            text = soup.get_text().lower()
            words = re.findall(r'\b\w{4,}\b', text) # Words longer than 3 chars
            freq = {}
            for w in words:
                freq[w] = freq.get(w, 0) + 1
            
            data['top_keywords'] = sorted(freq.items(), key=lambda x: x[1], reverse=True)[:10]
            
            results[url] = data
            
        except Exception as e:
            results[url] = {'error': str(e)}
            
    return results

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python seo_scraper.py <url1> <url2> ...")
        sys.exit(1)
        
    urls = sys.argv[1:]
    seo_data = scrape_seo(urls)
    print(json.dumps(seo_data, indent=2))
