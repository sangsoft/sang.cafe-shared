import { extractPremiseDetail } from '../../helpers/content';

// describe utils.content.extractPremiseDetail
describe('utils', () => {
  describe('content', () => {
    describe('extractPremiseDetail', () => {
      it.each([
        [
          `(*) Nhóm HS:
  - * Nhom HS:Ủy quyền; So CC:005881; Phong CC: VPCC Văn Thị Mỹ Đức; CC vien:Cao Hoàng Lân; Ngay cap so: 29/06/2021
- Ghi chú: xin phép xây dựng sửa chữa
(*) Tài sản:
  - Loai:Nhà ở So seri:0 So vao so:2154/2007/UB-GCN Dia chi:A65(Phải) Nguyễn Trãi,Phường Nguyễn Cư Trinh,Quận 1,TP. Hồ Chí Minh
(*) Đương sự:
  - Ben:Bên ủy quyền; Vai tro:Bên ủy quyền (Bên A); NGUYỄN CÔNG MINH, So CMT,HC:079055000834, Ngay sinh:00/00/1955
  - Ben:Bên ủy quyền; Vai tro:Bên ủy quyền (Bên A); Đoàn Thị Kim Chi, So CMT,HC:079155000278, Ngay sinh:00/00/1955
  - Ben:Bên nhận ủy quyền; Vai tro:Bên nhận ủy quyền (Bên B); Đinh Thị Thu Thủy, So CMT,HC:023845562, Ngay sinh:00/00/1984`,
          [
            { displayName: 'NGUYỄN CÔNG MINH', idNumber: '079055000834' },
            { displayName: 'Đoàn Thị Kim Chi', idNumber: '079155000278' },
            { displayName: 'Đinh Thị Thu Thủy', idNumber: '023845562' },
          ],
        ],
        [
          `(*) Nhóm HS:
  - Sửa đổi, bổ sung HĐ thế chấp; So CC:8315; Phong CC: PCC1; CC vien:Văn Thị Mỹ Đức; Ngay cap so: 18/04/2014
(*) Tài sản:
  - Đất không có tài sản: ; So cn:H10528; So nha:195/10E Điện Biên Phủ (So cu:242/3A ),Phường 15, Quận Bình Thạnh, TP. Hồ Chí Minh
(*) Đương sự:
  - Ben:Bên thế chấp; Vai tro:Bên thế chấp (Bên A); nguyễn văn hậu; So CMT,HC:025176077; Ngay sinh:01/01/3000; Dia chi:  ,
  - Ben:Bên thứ ba; Vai tro:Bên được bảo lãnh (Bên C); Công ty TNHH xây dựng thương mại Hoàng Long Phát; Giay phep KD:0309809847;  ,Phường 02, Quận 5, TP. Hồ Chí Minh
  - Ben:Bên thứ ba; Vai tro:Đại diện; Nguyễn Văn Tuấn; So CMT,HC:270099747; Ngay sinh:00/00/1972; Dia chi:  ,
  - Ben:Bên nhận thế chấp; Vai tro:Bên nhận thế chấp (Bên B); nh tmcp phương đông - cn tân thuận; Ma thue:000;  ,Phường Tân Định, Quận 1, TP. Hồ Chí Minh
  - Ben:Bên nhận thế chấp; Vai tro:Đại diện; nguyễn quốc khánh; So CMT,HC:000; Ngay sinh:00/00/1900; Dia chi:  ,`,
          [
            { displayName: 'nguyễn văn hậu', idNumber: '025176077' },
            { displayName: 'Công ty TNHH xây dựng thương mại Hoàng Long Phát', idNumber: '0309809847' },
            { displayName: 'nh tmcp phương đông - cn tân thuận', idNumber: '000' },
            { displayName: 'nguyễn quốc khánh', idNumber: '000' },
          ],
        ],
        [
          `(*) Nhóm HS:
  - Ủy quyền; So CC:54098; Phong CC: Phòng Công Chứng số 4; CC vien:; Ngay cap so: 20/12/2012
(*) Tài sản:
  - Nhà ở: ; So nha:66; So thua:1 phan thu; So to:13 66 Hồ Biểu Chánh, 11, Phú Nhuận, Tp. Hồ Chí Minh (So cu: ),
(*) Đương sự:
  - Ben:Bên nhận ủy quyền; Vai tro:Bên nhận ủy quyền (Bên B); Trần Quang Duy; So CMT,HC:212092828; Ngay sinh:00/00/1981; Dia chi:  ,
  - Ben:Bên ủy quyền; Vai tro:Bên ủy quyền (Bên A); Huỳnh Vĩ Nam; So CMT,HC:022235964; Ngay sinh:00/00/1967; Dia chi:  633/18/4M Lê Hồng Phong, phường 10, quận 10, Tp. HCM,`,
          [
            { displayName: 'Trần Quang Duy', idNumber: '212092828' },
            { displayName: 'Huỳnh Vĩ Nam', idNumber: '022235964' },
          ],
        ],
        [
          `(*) Nhóm HS:
  - * Nhom HS:HĐ thuê, mượn; So CC:21395; Phong CC: Vpcc Bình Thạnh; CC vien:Trần Anh Tuấn; Ngay cap so: 08/10/2015
(*) Tài sản:
  - Loai:Nhà ở, So cn:00, So nha:112 Lô số 4, Lô số 5, Khu biệt thự Kim Sơn, Nguyễn Văn Hưởng,Phường Thảo Điền,Quận 2,TP. Hồ Chí Minh
(*) Đương sự:
  - Ben:Bên cho thuê/ mượn; Vai tro:Bên cho thuê/ mượn (Bên A); Đào Mạnh Kháng; So CMT,HC:012073456; Ngay sinh://1969
  - Ben:Bên cho thuê/ mượn; Vai tro:Bên cho thuê/ mượn (Bên A); Vũ Thị Hương; So CMT,HC:012073511; Ngay sinh://1972
  - Ben:Bên thuê/ mượn; Vai tro:Bên thuê/mượn (Bên B); Phan Linh Giang; So CMT,HC:022442290; Ngay sinh://1972`,
          [
            { displayName: 'Đào Mạnh Kháng', idNumber: '012073456' },
            { displayName: 'Vũ Thị Hương', idNumber: '012073511' },
            { displayName: 'Phan Linh Giang', idNumber: '022442290' },
          ],
        ],
      ])(`should return correct premise detail`, (content, expected) => {
        expect(extractPremiseDetail(content)).toEqual(expected);
      });
    });
  });
});
