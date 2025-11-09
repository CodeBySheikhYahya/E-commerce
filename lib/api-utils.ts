import https from 'https';
import { URL } from 'url';

// Helper function to make HTTPS request with self-signed certificate support
export function httpsFetch(url: string, options?: { method?: string; headers?: Record<string, string>; body?: string }): Promise<{ status: number; data: any }> {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const method = options?.method || 'GET';
    
    const requestOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port || 443,
      path: urlObj.pathname + urlObj.search,
      method: method,
      headers: {
        ...options?.headers,
      },
      rejectUnauthorized: false, // Accept self-signed certificates (development only)
    };

    const req = https.request(requestOptions, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = data ? JSON.parse(data) : {};
          resolve({ status: res.statusCode || 200, data: jsonData });
        } catch (error) {
          reject(new Error(`Failed to parse JSON: ${error}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (options?.body) {
      req.write(options.body);
    }

    req.end();
  });
}


