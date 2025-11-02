// Generic API client for fetching data from Next.js proxy
export function createApiClient(apiBase: string) {
  return {
    async getAll() {
      console.log('📡 Fetching from Next.js API proxy:', apiBase);
      
      try {
        const response = await fetch(apiBase, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        console.log('📥 Response Status:', response.status);
        
        if (!response.ok) {
          let errorData;
          try {
            errorData = await response.json();
          } catch {
            errorData = { message: await response.text() };
          }
          console.error('❌ API Error:', response.status, response.statusText, errorData);
          throw new Error(`API Error: ${response.status} ${response.statusText}. ${errorData.error || errorData.details || errorData.message || ''}`);
        }
        
        const data = await response.json();
        console.log('✅ API Response Data:', data);
        
        return data;
      } catch (error: any) {
        console.error('❌ Fetch Error:', error);
        throw error;
      }
    },

    async getById(id: string) {
      console.log('📡 Fetching by ID from Next.js API proxy:', `${apiBase}/${id}`);
      
      try {
        const response = await fetch(`${apiBase}/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        console.log('📥 Response Status:', response.status);
        
        if (!response.ok) {
          let errorData;
          try {
            errorData = await response.json();
          } catch {
            errorData = { message: await response.text() };
          }
          console.error('❌ API Error:', response.status, response.statusText, errorData);
          throw new Error(`API Error: ${response.status} ${response.statusText}. ${errorData.error || errorData.details || errorData.message || ''}`);
        }
        
        const data = await response.json();
        console.log('✅ API Response Data:', data);
        
        return data;
      } catch (error: any) {
        console.error('❌ Fetch Error:', error);
        throw error;
      }
    },
  };
}

