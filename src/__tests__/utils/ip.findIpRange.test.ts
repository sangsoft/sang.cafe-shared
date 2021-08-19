import { findIpRange } from '../../helpers/ip';

describe('utils', () => {
  describe('ip', () => {
    describe('findIpRange', () => {
      it.each([
        // These are real life customer IP recorded in our DB
        ['118.68.96.242', 'Hà Nội'],
        ['171.237.198.246', 'Hà Nội'],
        ['171.253.182.164', 'Hồ Chí Minh'],
        ['14.162.202.22', 'Hà Nội'],
        ['2001:ee0:4fcc:55c0:c039:d1da:723f:583c', 'Hà Nội'],
        ['2001:ee0:5007:2760:24ca:84ae:7581:355', 'Hồ Chí Minh'],
        ['2402:800:6314:2a3d:985f:2283:95cd:1a6f', 'Hà Nội'],

        // Edge cases
        ['118.68.96.255', 'Hà Nội'],
        ['118.68.96.0', 'Hà Nội'],
        ['171.253.182.255', 'Hồ Chí Minh'],
        ['171.253.182.0', 'Hồ Chí Minh'],
        ['253.143.197.106', null],  // This IPv4's big int value is similar to that of a value later in the IPv6 range
                                    // 4254057834 to check between (42540578165288142620979710979523739648, 42540578165289351546799325608698445823)
                                    // Match first 8 number
      ])('findIpRange(%p) should be %p', async (ip, expected) => {
        const range = await findIpRange(ip);
        if (expected) {
          expect(range.city).toBe(expected);
        } else {
          expect(range).toBeNull;
        }
      });
    });
  });
});