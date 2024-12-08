import { validateIp } from "./ip.validation.util";

describe('validateIp', () => {
  it('should return proper error if ip is empty', () => {
    const result = validateIp('');

    expect(result).toEqual({
      isValid: false,
      errorMessage: 'Please enter an IP address.'
    });
  });

  describe('IPv4', () => {
    describe('valid forma', () => {
      const validV4Ips = [
        '0.0.0.0',
        '172.26.168.134',
        '255.255.255.255'];
      it.each(validV4Ips)('should return valid result if ip %s is passed', (validIp) => {
        const result = validateIp(validIp);

        expect(result).toEqual({
          isValid: true,
        });
      });
    });

    describe('invalid format', () => {
      const invalidV4Ips = [
        '.100.100.100.100',
        '100..100.100.100.',
        '100.100.100.100.',
        '999.999.999.999',
        '256.100.100.100.100',
        '123.123.123',
        'http://123.123.123',
        'a.a.a.a',
      ];

      it.each(invalidV4Ips)('should return proper error if ip %s is passed', (invalidIp) => {
        const result = validateIp(invalidIp);

        expect(result).toEqual({
          isValid: false,
          errorMessage: "Invalid IP address format. Please enter a valid IPv4 or IPv6 address."
        })
      });
    })
  });

  describe('IPv6', () => {
    describe('valid format', () => {
      const validV6Ips = [
        '2001:0000:1234:0000:0000:C1C0:ABCD:0876',
        '::2:3:4:5:6:7:8',
        'a:b:c:d:e:f:f1:f2',
        'a:0:0:0:0:0:0:0'
      ];

      it.each(validV6Ips)('should return valid result if ip %s is passed', (validIp) => {
        const result = validateIp(validIp);

        expect(result).toEqual({
          isValid: true,
        });
      });
    });


    describe('invalid format', () => {
      const invalidV6Ips = [
        '11:36:12',
        '02001:0000:1234:0000:0000:C1C0:ABCD:0876',
        '2001:1:1:1:1:1:255Z255X255Y255',
        '3ffe:b00::1::a',
        '1::5:1.256.3.4',
        '::300.300.300.300',
        '1111:2222::5555:',
        'fe80:0000:0000:0000:0204:61ff:254.157.241.086',
        '123',
        'ldkfj',
        '::ffff:12345678901234567890.1.26',
      ];

      it.each(invalidV6Ips)('should return proper error if ip %s is passed', (invalidIp) => {
        const result = validateIp(invalidIp);

        expect(result).toEqual({
          isValid: false,
          errorMessage: "Invalid IP address format. Please enter a valid IPv4 or IPv6 address."
        })
      });
    });
  });
});