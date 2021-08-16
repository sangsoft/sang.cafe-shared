"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const content_1 = require("../../helpers/content");
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
                [
                    `
Cho thuê căn Shophouse kim cương SB11-66 CĂN GÓC View trực diện mặt biển Hồ nhân tạo lớn nhất Việt Nam

Diện tích 209m2 đất, tổng xây dựng 5 sàn 434m2.

Thích hợp mở nhà hàng, quán bar, homestay........
Nằm ngay gần bến xe buýt điện đầu tiên tại Việt Nam.
View triệu đô mặt Hồ nước mặn nhân tạo lớn Nhất.
Việt Nam và lớn thứ 3 thế giới.
Cách 200m là trung tâm thương mại Vincom lớn nhất Miền Bắc, Thiên đường mua sắm, giải trí.
 
Với 65 tòa chung cư, 4.000 căn biệt thự, 1 tòa văn phòng 45 tầng công suất 20.000 nhân Viên tạo nên một lượng khách khổng lồ ngay tại dự án.
 
Tương lai Vinpealand đi vào hoạt động Vinhomes Ocean Park sẽ là trung tâm du lịch của hàng triệu du khách Thủ Đô và toàn Miền Bắc.
 
Liên hệ sở hữu căn shophouse Siêu Vip: 0845089666.
          `,
                    `
Cho thuê căn Shophouse kim cương SB11-66 CĂN GÓC View trực diện mặt biển Hồ nhân tạo lớn nhất Việt Nam

Diện tích 209m2 đất, tổng xây dựng 5 sàn 434m2.

Thích hợp mở nhà hàng, quán bar, homestay........
Nằm ngay gần bến xe buýt điện đầu tiên tại Việt Nam.
View triệu đô mặt Hồ nước mặn nhân tạo lớn Nhất.
Việt Nam và lớn thứ 3 thế giới.
Cách 200m là trung tâm thương mại Vincom lớn nhất Miền Bắc, Thiên đường mua sắm, giải trí.
 
Với 65 tòa chung cư, 4.000 căn biệt thự, 1 tòa văn phòng 45 tầng công suất 20.000 nhân Viên tạo nên một lượng khách khổng lồ ngay tại dự án.
 
Tương lai Vinpealand đi vào hoạt động Vinhomes Ocean Park sẽ là trung tâm du lịch của hàng triệu du khách Thủ Đô và toàn Miền Bắc.
 
Liên hệ sở hữu căn shophouse Siêu Vip: {{phone_number}}.
          `
                ],
                [
                    `
Cho thuê nhà nguyên căn phố Thọ Tháp, Cầu Giấy, diện tích 130m2, 2 tầng, mặt tiền 7,5m, ô tô đỗ cửa.
+ Nhà 2 tầng, diện tích 130m2/1 tầng, diện tích sử dụng 260m2, mặt tiền rộng 7.5m, đường ô tô tránh nhau, có vỉa hè rộng 4m. Mặt tiền rộng kinh doanh tốt, rất thích hợp với kinh doanh nhà hàng, quán Caffe, Spa, cửa hàng thời trang, showroom ô tô, văn phòng, tiệm bánh, ...
+ Vị trí: Mất 3p đi bộ ra Công viên Cầu Giấy, liên kết ra các đường lớn Trần Thái Tông, Phạm Văn Bạch, Cầu Giấy, Khúc Thừa Dụ, Thành Thái... thuận tiện, khu vực sầm uất, an ninh tốt...
+ Giá ưu đãi mùa dịch 45 triệu/tháng. Ưu tiên khách thuê lâu dài.
Liên hệ gặp chủ nhà: 0975057624- Mr Tâm (tôi chỉ tiếp người có nhu cầu thiện chí thuê, miễn Trung gian, Môi giới, quảng cáo).
          `,
                    `
Cho thuê nhà nguyên căn phố Thọ Tháp, Cầu Giấy, diện tích 130m2, 2 tầng, mặt tiền 7,5m, ô tô đỗ cửa.
+ Nhà 2 tầng, diện tích 130m2/1 tầng, diện tích sử dụng 260m2, mặt tiền rộng 7.5m, đường ô tô tránh nhau, có vỉa hè rộng 4m. Mặt tiền rộng kinh doanh tốt, rất thích hợp với kinh doanh nhà hàng, quán Caffe, Spa, cửa hàng thời trang, showroom ô tô, văn phòng, tiệm bánh, ...
+ Vị trí: Mất 3p đi bộ ra Công viên Cầu Giấy, liên kết ra các đường lớn Trần Thái Tông, Phạm Văn Bạch, Cầu Giấy, Khúc Thừa Dụ, Thành Thái... thuận tiện, khu vực sầm uất, an ninh tốt...
+ Giá ưu đãi mùa dịch 45 triệu/tháng. Ưu tiên khách thuê lâu dài.
Liên hệ gặp chủ nhà: {{phone_number}}- Mr Tâm (tôi chỉ tiếp người có nhu cầu thiện chí thuê, miễn Trung gian, Môi giới, quảng cáo).
          `
                ],
                [
                    `
184Cho thuê nhà 16 Hoàng Việt, 2 mặt tiền góc ngã tư Hoàng Việt - Đông Du gần chợ An Hải Bắc, thuận lợi buôn bán, diện tích sàn 92m2, ngang 10m, 2 tầng tổng diện tích cho thuê 184m2. Khu dân cư đông đúc nhất quận Sơn Trà , Đà Nẵng, ngay sau khán đài xem bắn pháo hoa
Rất thuận tiện để mở các siêu thị
Call 0916899783/ 0913 222 214 ***0916899783*** +840972551218-Mr.Minh
          `,
                    `
184Cho thuê nhà 16 Hoàng Việt, 2 mặt tiền góc ngã tư Hoàng Việt - Đông Du gần chợ An Hải Bắc, thuận lợi buôn bán, diện tích sàn 92m2, ngang 10m, 2 tầng tổng diện tích cho thuê 184m2. Khu dân cư đông đúc nhất quận Sơn Trà , Đà Nẵng, ngay sau khán đài xem bắn pháo hoa
Rất thuận tiện để mở các siêu thị
Call {{phone_number}}/ {{phone_number}} ***{{phone_number}}*** +{{phone_number}}-Mr.Minh
          `
                ],
            ])('cleanPhoneNumber(%p) should be %p', (text, expected) => {
                expect(content_1.cleanPhoneNumber(text)).toEqual(expected);
            });
        });
    });
});
//# sourceMappingURL=content.cleanPhoneNumber.test.js.map