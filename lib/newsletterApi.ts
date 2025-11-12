// Newsletter API functions
export interface NewsletterRequest {
  email: string;
  fullName?: string;
  isSubscribed: boolean;
  subscribedDate: string;
}

export interface NewsletterResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    id: number;
  };
}

export async function subscribeNewsletter(data: NewsletterRequest): Promise<NewsletterResponse> {
  const response = await fetch('/api/newsletter', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();
  
  // Backend returns error format even for 400+ status codes
  // So we return the data as-is (it has success, statusCode, message, data)
  return responseData;
}

