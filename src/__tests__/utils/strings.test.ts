import 'jest';
import { slug } from '../../helpers/strings';
describe('utils', () => {
  describe('strings', () => {
    describe('strings', () => {
      it.each([
        [
          'Cần sang spa view cực đẹp, xung quanh không gian xanh, nằm trong khu biệt thự quân đội, xung quanh là 10 block chung cư K26, đường Phan Văn Trị, phường 7, quận Gò Vấp.',
          'can-sang-spa-view-cuc-dep-xung-quanh-khong-gian-xanh-nam-trong-khu-biet-thu-quan-doi-xung-quanh-la-10-block-chung-cu-k26-duong-phan-van-tri-phuong-7-quan-go-vap'
        ],
        [
          'Sang nhượng spa DREAM BEAUTY AND SPA trung tâm quận Bình Thạnh.',
          'sang-nhuong-spa-dream-beauty-and-spa-trung-tam-quan-binh-thanh'
        ],
        [
          'Sang nhanh spa 2 mặt tiền lớn giá 15 triệu/tháng, khu vực dân cư đông đúc, trang thiết bị đầy đủ.',
          'sang-nhanh-spa-2-mat-tien-lon-gia-15-trieu-thang-khu-vuc-dan-cu-dong-duc-trang-thiet-bi-day-du'
        ],
        [
          'Pizza 4P’s Bao Khanh',
          'pizza-4ps-bao-khanh'
        ]
      ])('slug(%p) should be %p', (title: string, expected: string) => {
        expect(slug(title)).toEqual(expected);
      })
    });
  });
});