export function isApiError(error: unknown): error is { data: { message: string } } {
    return (
      typeof error === 'object' &&
      error !== null &&
      'data' in error &&
      typeof (error as any).data.message === 'string'
    );
  }