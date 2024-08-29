export class BadRequestResponse extends Response {
  constructor(body: { error: string; code: number }) {
    super(JSON.stringify(body), {
      status: body.code,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
