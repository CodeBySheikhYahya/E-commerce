import https from 'https';

// Helper function to make HTTPS request with self-signed certificate support
export function httpsFetch(url: string): Promise<{ status: number; data: any }> {
  return new Promise((resolve, reject) => {
    const options = {
      rejectUnauthorized: false, // Accept self-signed certificates (development only)
    };

    https.get(url, options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({ status: res.statusCode || 200, data: jsonData });
        } catch (error) {
          reject(new Error(`Failed to parse JSON: ${error}`));
        }
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}


