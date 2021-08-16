import { cleanAddress } from "../../helpers/content";

describe('utils', () => {
  describe('content', () => {
    describe('cleanAddress', () => {
      it.each([
        [
          `
Chính Chủ Cho Thuê quán cà fe mặt đường 96 Trung Lực, Hải An, Hải Phòng.
– Diện tích: 100m2, mặt tiền 6,5m, sâu 19m.
– Giá: 12 triệu/tháng.
– Quán 2 mặt tiền thông ra 193 Văn Cao.
– Lô góc, có kho đựng đồ.
Ai có nhu cầu liên hệ 0942066314.
          `,
          `
Chính Chủ Cho Thuê quán cà fe mặt đường {{address}}, Hải An, Hải Phòng.
– Diện tích: 100m2, mặt tiền 6,5m, sâu 19m.
– Giá: 12 triệu/tháng.
– Quán 2 mặt tiền thông ra {{address}}.
– Lô góc, có kho đựng đồ.
Ai có nhu cầu liên hệ 0942066314.
          `
        ],
        [
          `
Chính chủ cho thuê cửa hàng địa chỉ tại 264 Xuân Đỉnh, Quận Bắc Từ Liêm, Hà Nội.
Diện tích 25m2.
Giá 5 triệu/tháng.
Liên hệ chủ nhà 0988906680 hoặc 0989149982.
          `,
          `
Chính chủ cho thuê cửa hàng địa chỉ tại {{address}}, Quận Bắc Từ Liêm, Hà Nội.
Diện tích 25m2.
Giá 5 triệu/tháng.
Liên hệ chủ nhà 0988906680 hoặc 0989149982.
          `
        ],
        [
          `
Cho thuê mặt bằng kinh doanh tại địa chỉ số 86 Lê Trọng Tấn, Khương Mai, Thanh Xuân, Hà Nội.
Vị trí đẹp nhất phố Lê Trọng Tấn, gần VinCom, ngân hàng, vị trí kinh doanh, văn phòng đắc địa.
Vỉa hè rộng rãi, chỗ để ô tô, xe máy thoải mái thuận tiện giao dịch, khu vực tập trung nhiều tòa nhà văn phòng, giao thông khu vực thuận tiện sang các quận trung tâm khác của thành phố.
Phù hợp làm chuỗi cửa hàng, văn phòng giao dịch, ngân hàng, showroom, cafe,…
Diện tích 72m2, mặt tiền 11m giá 63 triệu/tháng.
Lh: Ms.Mai Anh 0917.971.866 (KHÔNG MẤT PHÍ MÔI GIỚI)
          `,
          `
Cho thuê mặt bằng kinh doanh tại địa chỉ {{address}}, Thanh Xuân, Hà Nội.
Vị trí đẹp nhất phố Lê Trọng Tấn, gần VinCom, ngân hàng, vị trí kinh doanh, văn phòng đắc địa.
Vỉa hè rộng rãi, chỗ để ô tô, xe máy thoải mái thuận tiện giao dịch, khu vực tập trung nhiều tòa nhà văn phòng, giao thông khu vực thuận tiện sang các quận trung tâm khác của thành phố.
Phù hợp làm chuỗi cửa hàng, văn phòng giao dịch, ngân hàng, showroom, cafe,…
Diện tích 72m2, mặt tiền 11m giá 63 triệu/tháng.
Lh: Ms.Mai Anh 0917.971.866 (KHÔNG MẤT PHÍ MÔI GIỚI)
          `
        ],
        [
          `
Cho thuê nhà 16 Hoàng Việt, 2 mặt tiền góc ngã tư Hoàng Việt - Đông Du gần chợ An Hải Bắc, thuận lợi buôn bán, diện tích sàn 92m2, ngang 10m, 2 tầng tổng diện tích cho thuê 184m2. Khu dân cư đông đúc nhất quận Sơn Trà , Đà Nẵng, ngay sau khán đài xem bắn pháo hoa
Rất thuận tiện để mở các siêu thị
Call 0916899783/ 0913 222 214
          `,
          `
Cho thuê nhà {{address}}, 2 mặt tiền góc ngã tư Hoàng Việt - Đông Du gần chợ An Hải Bắc, thuận lợi buôn bán, diện tích sàn 92m2, ngang 10m, 2 tầng tổng diện tích cho thuê 184m2. Khu dân cư đông đúc nhất quận Sơn Trà , Đà Nẵng, ngay sau khán đài xem bắn pháo hoa
Rất thuận tiện để mở các siêu thị
Call 0916899783/ 0913 222 214
          `
        ],
        [
          `
Chính chủ cho thuê hoặc nhượng lại CH quần áo Thời Trang đang kinh doanh tốt tại 340 Nguyễn Huy Tưởng, 0902068526


- Diện tích 20 m2, mặt tiền đẹp.
- Khu giao thông thuận lợi, đông dân cư, nhiều văn phòng, cty kinh doanh rất sầm uất.
- Giá thuê: 8 triệu/ tháng ( Ưu tiên làm đẹp.)
- Liên hệ chính chủ: 0902068526
http://www.sanbatdongsanviet.com.vn
          `,
          `
Chính chủ cho thuê hoặc nhượng lại CH quần áo Thời Trang đang kinh doanh tốt tại {{address}}, 0902068526


- Diện tích 20 m2, mặt tiền đẹp.
- Khu giao thông thuận lợi, đông dân cư, nhiều văn phòng, cty kinh doanh rất sầm uất.
- Giá thuê: 8 triệu/ tháng ( Ưu tiên làm đẹp.)
- Liên hệ chính chủ: 0902068526
http://www.sanbatdongsanviet.com.vn
          `
        ],
      ])('cleanAddress(%p) should be %p', (text, expected) => {
        expect(cleanAddress(text)).toEqual(expected);
      });
    });
  });
});