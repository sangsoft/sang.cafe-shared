import 'jest';
import { cleanPhoneNumber } from '../../helpers/content';
describe('utils', () => {
  describe('content', () => {
    describe('cleanPhoneNumber', () => {
      it.each([
        [
`
Sang cửa hàng ở 108 Nam Đồng, Đống Đa, Hà Nội.
Ai có nhu cầu liên hệ số đt 0328888888.
`,
`
Sang cửa hàng ở 108 Nam Đồng, Đống Đa, Hà Nội.
Ai có nhu cầu liên hệ số đt {{phone_number}}.
`
        ],
        [
`
Sang cửa hàng ở 108 Nam Đồng, Đống Đa, Hà Nội.
Ai có nhu cầu liên hệ số đt O328888888.
`,
`
Sang cửa hàng ở 108 Nam Đồng, Đống Đa, Hà Nội.
Ai có nhu cầu liên hệ số đt {{phone_number}}.
`
        ],
        [
`
Sang cửa hàng ở 108 Nam Đồng, Đống Đa, Hà Nội.
Ai có nhu cầu liên hệ số đt O32tam888888.
`,
`
Sang cửa hàng ở 108 Nam Đồng, Đống Đa, Hà Nội.
Ai có nhu cầu liên hệ số đt {{phone_number}}.
`
        ],
        [
`
Sang cửa hàng ở 108 Nam Đồng, Đống Đa, Hà Nội.
Ai có nhu cầu liên hệ số đt 032tam888888.
`,
`
Sang cửa hàng ở 108 Nam Đồng, Đống Đa, Hà Nội.
Ai có nhu cầu liên hệ số đt {{phone_number}}.
`
        ],
        [
          `
          Sang cửa hàng ở 108 Nam Đồng, Đống Đa, Hà Nội.
          Ai có nhu cầu liên hệ số đt 032 999 9999.
          `,
          `
          Sang cửa hàng ở 108 Nam Đồng, Đống Đa, Hà Nội.
          Ai có nhu cầu liên hệ số đt {{phone_number}}.
          `
        ],
        [
          `
          Sang cửa hàng ở 108 Nam Đồng, Đống Đa, Hà Nội.
          Ai có nhu cầu liên hệ số đt 0329 999 999.
          `,
          `
          Sang cửa hàng ở 108 Nam Đồng, Đống Đa, Hà Nội.
          Ai có nhu cầu liên hệ số đt {{phone_number}}.
          `
        ],
        [
          `
          Sang cửa hàng ở 108 Nam Đồng, Đống Đa, Hà Nội.
          Ai có nhu cầu liên hệ số đt (032)-888-3444.
          `,
          `
          Sang cửa hàng ở 108 Nam Đồng, Đống Đa, Hà Nội.
          Ai có nhu cầu liên hệ số đt {{phone_number}}.
          `
        ],
        [
          `
          Sang cửa hàng ở 108 Nam Đồng, Đống Đa, Hà Nội.
          Ai có nhu cầu liên hệ số đt 032777777bay.
          `,
          `
          Sang cửa hàng ở 108 Nam Đồng, Đống Đa, Hà Nội.
          Ai có nhu cầu liên hệ số đt {{phone_number}}.
          `
        ],
        [
          `
          Sang cửa hàng ở 108/265/13/34 Nam Đồng, Đống Đa, Hà Nội.
          Ai có nhu cầu liên hệ số đt 032777777bay.
          `,
          `
          Sang cửa hàng ở 108/265/13/34 Nam Đồng, Đống Đa, Hà Nội.
          Ai có nhu cầu liên hệ số đt {{phone_number}}.
          `
        ],
        [
          `
          Sang cửa hàng ở 108/265/13/34 Nam Đồng, Đống Đa, Hà Nội.
          Ai có nhu cầu liên hệ số đt 032x888888. x = 6
          `,
          `
          Sang cửa hàng ở 108/265/13/34 Nam Đồng, Đống Đa, Hà Nội.
          Ai có nhu cầu liên hệ số đt {{phone_number}}.
          `
        ],
        [
          `
          Sang cửa hàng ở 108/265/13/34 Nam Đồng, Đống Đa, Hà Nội.
          Ai có nhu cầu liên hệ số đt 032*888888. * = 3
          `,
          `
          Sang cửa hàng ở 108/265/13/34 Nam Đồng, Đống Đa, Hà Nội.
          Ai có nhu cầu liên hệ số đt {{phone_number}}.
          `
        ],
        [
          `
          Sang cửa hàng ở 108/265/13/34 Nam Đồng, Đống Đa, Hà Nội.
          Ai có nhu cầu liên hệ số đt 032.666.7777.
          `,
          `
          Sang cửa hàng ở 108/265/13/34 Nam Đồng, Đống Đa, Hà Nội.
          Ai có nhu cầu liên hệ số đt {{phone_number}}.
          `
        ],
        [
          `
          Sang cửa hàng ở 108/265/13/34 Nam Đồng, Đống Đa, Hà Nội.
          Ai có nhu cầu liên hệ số đt 032.666.7777 hoặc 032.999.2222.
          `,
          `
          Sang cửa hàng ở 108/265/13/34 Nam Đồng, Đống Đa, Hà Nội.
          Ai có nhu cầu liên hệ số đt {{phone_number}} hoặc {{phone_number}}.
          `
        ],
        [
          `
          Sang cửa hàng ở 108/265/13/34 Nam Đồng, Đống Đa, Hà Nội.
          Ai có nhu cầu liên hệ số đt 032777777bay hoặc 032.999.2222.
          `,
          `
          Sang cửa hàng ở 108/265/13/34 Nam Đồng, Đống Đa, Hà Nội.
          Ai có nhu cầu liên hệ số đt {{phone_number}} hoặc {{phone_number}}.
          `
        ],
        [
          `
          Sang cửa hàng ở 032 Nam Đồng, Đống Đa, Hà Nội.
          Ai có nhu cầu liên hệ số đt 032777777bay hoặc 032 999 2222.
          `,
          `
          Sang cửa hàng ở 032 Nam Đồng, Đống Đa, Hà Nội.
          Ai có nhu cầu liên hệ số đt {{phone_number}} hoặc {{phone_number}}.
          `
        ],
        [
          `
Cần cho thuê showroom điểm cho bạn ở mọi góc cạnh
Cần cho thuê mặt đường 5 cũ, đẹp long lanh luôn
Làm showroom, văn phòng
Mặt tiền 70m
Điện nước đầy đủ
Hướng Nam ghé Tây
Giá thuê cả 50 triệu/tháng
Có thể thuê tách riêng .
Cần cho thuê shwroom đường 5 cũ, Hồng Bàng
Liên hệ : 0936.996.5190
          `,
          `
Cần cho thuê showroom điểm cho bạn ở mọi góc cạnh
Cần cho thuê mặt đường 5 cũ, đẹp long lanh luôn
Làm showroom, văn phòng
Mặt tiền 70m
Điện nước đầy đủ
Hướng Nam ghé Tây
Giá thuê cả 50 triệu/tháng
Có thể thuê tách riêng .
Cần cho thuê shwroom đường 5 cũ, Hồng Bàng
Liên hệ : {{phone_number}}
          `
        ],
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
Chính Chủ Cho Thuê quán cà fe mặt đường 96 Trung Lực, Hải An, Hải Phòng.
– Diện tích: 100m2, mặt tiền 6,5m, sâu 19m.
– Giá: 12 triệu/tháng.
– Quán 2 mặt tiền thông ra 193 Văn Cao.
– Lô góc, có kho đựng đồ.
Ai có nhu cầu liên hệ {{phone_number}}.
          `
        ],
        [
          `
Cho thuê nhà đường Lê Duẩn, ngang 7m, chỉ 35 triệu/tháng
- Vị trí: đường Lê Duẩn
- Diện tích: 7m x 10m x 4 tầng
- Giá cho thuê: 35 triệu/tháng
- Xem thêm 200 căn nhà cho thuê khác ở trang cá nhân của tôi
- Sổ đỏ chính chủ, bàn giao nhà ngay. Ảnh mang tính chất minh họa. Add zalo để lấy ảnh thật
- Khu dân cư đông đúc, giao thông thuận tiện.
- Mặt bằng trống, dễ dàng decor, setup để kinh doanh.
- Thích hợp kinh doanh mọi ngành nghề: Spa, cafe, Thời trang, quần áo, trung tâm ngoại ngữ, giáo dục, Văn phòng, Phòng khám, Salon tóc, showroom, Siêu thị, cửa hàng, điện thoại, Bida, ăn uống, F&B…
- Đây thực sự là một địa điểm lý tưởng để kinh doanh buôn bán.
- Công ty chúng tôi đang hợp tác, nhận ký gửi với hơn 2000 chủ nhà, 200 tòa nhà ở quận Hải Châu, Đà Nẵng.
- Để không mất quá nhiều thời gian tìm kiếm Nhà Mặt Phố, Mặt Bằng phù hợp với mô hình kinh doanh của mình ở quận Hải Châu và các quận khác Đà Nẵng quý khách vui lòng liên hệ để được tư vấn và hỗ trợ tốt nhất.
Mr Quang 0905.859.626 (Call - SMS – Zalo – Viber)
Trân trọng cảm ơn vì đã xem tin!
          `,
          `
Cho thuê nhà đường Lê Duẩn, ngang 7m, chỉ 35 triệu/tháng
- Vị trí: đường Lê Duẩn
- Diện tích: 7m x 10m x 4 tầng
- Giá cho thuê: 35 triệu/tháng
- Xem thêm 200 căn nhà cho thuê khác ở trang cá nhân của tôi
- Sổ đỏ chính chủ, bàn giao nhà ngay. Ảnh mang tính chất minh họa. Add zalo để lấy ảnh thật
- Khu dân cư đông đúc, giao thông thuận tiện.
- Mặt bằng trống, dễ dàng decor, setup để kinh doanh.
- Thích hợp kinh doanh mọi ngành nghề: Spa, cafe, Thời trang, quần áo, trung tâm ngoại ngữ, giáo dục, Văn phòng, Phòng khám, Salon tóc, showroom, Siêu thị, cửa hàng, điện thoại, Bida, ăn uống, F&B…
- Đây thực sự là một địa điểm lý tưởng để kinh doanh buôn bán.
- Công ty chúng tôi đang hợp tác, nhận ký gửi với hơn 2000 chủ nhà, 200 tòa nhà ở quận Hải Châu, Đà Nẵng.
- Để không mất quá nhiều thời gian tìm kiếm Nhà Mặt Phố, Mặt Bằng phù hợp với mô hình kinh doanh của mình ở quận Hải Châu và các quận khác Đà Nẵng quý khách vui lòng liên hệ để được tư vấn và hỗ trợ tốt nhất.
Mr Quang {{phone_number}} (Call - SMS – Zalo – Viber)
Trân trọng cảm ơn vì đã xem tin!
          `
        ],
        [
          `
Cho thuê nhà mặt phố La Thành, 200m2 sát khu dân cư, tiện lợi, giá hấp dẫn, chủ nhà thân thiện
Cho thuê mặt bằng phố La Thành, Đống Đa, Hà Nội. Diện tích 200m2, giá thoả thuận, ngay sát cổng chung cư đông dân cư, mặt đường, ô tô đỗ cửa, giá thoả thuận hợp lý trong bối cảnh dịch, trước đã làm nhà hàng ăn, 2 tầng.
Liên hệ chú Chính: 0968669099.
          `,
          `
Cho thuê nhà mặt phố La Thành, 200m2 sát khu dân cư, tiện lợi, giá hấp dẫn, chủ nhà thân thiện
Cho thuê mặt bằng phố La Thành, Đống Đa, Hà Nội. Diện tích 200m2, giá thoả thuận, ngay sát cổng chung cư đông dân cư, mặt đường, ô tô đỗ cửa, giá thoả thuận hợp lý trong bối cảnh dịch, trước đã làm nhà hàng ăn, 2 tầng.
Liên hệ chú Chính: {{phone_number}}.
          `
        ],
      ])('cleanPhoneNumber(%p) should be %p', (text: string, expected: string) => {
        expect(cleanPhoneNumber(text)).toEqual(expected);
      })
    });
  });
});