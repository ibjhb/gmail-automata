const base_message = {
    getFrom: () => '',
    getTo: () => '',
    getCc: () => '',
    getBcc: () => '',
    getReplyTo: () => '',
    getSubject: () => '',
    getPlainBody: () => '',
    getRawContent: () => '',
} as GoogleAppsScript.Gmail.GmailMessage;

function c(condition_str: string, message: Partial<GoogleAppsScript.Gmail.GmailMessage>) {
    const condition = new Condition(condition_str);
    const message_data = new MessageData(Object.assign({}, base_message, message));
    return condition.match(message_data);
}

test('from and (receiver or receiver)', () => {
    expect(
        c(`
            (and
            (from abc@gmail.com)
            (or
                (receiver ijl@gmail.com)
                (receiver xyz@gmail.com)))`,
            {
                getFrom: () => 'dd <abc+dd@gmail.com>',
                getTo: () => 'something+-random@gmail.com',
                getCc: () => 'xyz+tag@gmail.com',
            })
    ).toBe(true);
});
