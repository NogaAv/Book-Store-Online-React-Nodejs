class Response {
    constructor(status, statusText, message) {
        this.status = status;
        this.statusText = statusText;
        this.message = message;
    }
}

export class SuccessResponse extends Response {
    constructor(status, statusText, message, data) {
        super(status, statusText, message);

        this.data = data;
    }
}

export class ErrorResponse extends Response {
    constructor(status, statusText, message) {
        super(status, statusText, message);
    }
}
