import { extractPremiseDetail } from '../../helpers/content';
import { matchSubstring } from '../../helpers/strings';

// describe utils.content.extractPremiseDetail
describe('utils', () => {
  describe('content', () => {
    describe('extractPremiseDetail', () => {
      it.each([
        // [
        //   `(*) Nhóm HS:
        //   - * Nhom HS:Ủy quyền; So CC:005881; Phong CC: VPCC Văn Thị Mỹ Đức; CC vien:Cao Hoàng Lân; Ngay cap so: 29/06/2021
        // - Ghi chú: xin phép xây dựng sửa chữa
        // (*) Tài sản:
        //   - Loai:Nhà ở So seri:0 So vao so:2154/2007/UB-GCN Dia chi:A65(Phải) Nguyễn Trãi,Phường Nguyễn Cư Trinh,Quận 1,TP. Hồ Chí Minh
        // (*) Đương sự:
        //   - Ben:Bên ủy quyền; Vai tro:Bên ủy quyền (Bên A); NGUYỄN CÔNG MINH, So CMT,HC:079055000834, Ngay sinh:00/00/1955
        //   - Ben:Bên ủy quyền; Vai tro:Bên ủy quyền (Bên A); Đoàn Thị Kim Chi, So CMT,HC:079155000278, Ngay sinh:00/00/1955
        //   - Ben:Bên nhận ủy quyền; Vai tro:Bên nhận ủy quyền (Bên B); Đinh Thị Thu Thủy, So CMT,HC:023845562, Ngay sinh:00/00/1984`,
        //   [
        //     {
        //       address: 'A65(Phải) Nguyễn Trãi,Phường Nguyễn Cư Trinh,Quận 1,TP. Hồ Chí Minh',
        //       users: [
        //         { displayName: 'NGUYỄN CÔNG MINH', idNumber: '079055000834' },
        //         { displayName: 'Đoàn Thị Kim Chi', idNumber: '079155000278' },
        //         { displayName: 'Đinh Thị Thu Thủy', idNumber: '023845562' },
        //       ],
        //     },
        //   ],
        // ],
        // [
        //   `(*) Nhóm HS:
        //   - Sửa đổi, bổ sung HĐ thế chấp; So CC:8315; Phong CC: PCC1; CC vien:Văn Thị Mỹ Đức; Ngay cap so: 18/04/2014
        // (*) Tài sản:
        //   - Đất không có tài sản: ; So cn:H10528; So nha:195/10E Điện Biên Phủ (So cu:242/3A ),Phường 15, Quận Bình Thạnh, TP. Hồ Chí Minh
        // (*) Đương sự:
        //   - Ben:Bên thế chấp; Vai tro:Bên thế chấp (Bên A); nguyễn văn hậu; So CMT,HC:025176077; Ngay sinh:01/01/3000; Dia chi:  ,
        //   - Ben:Bên thứ ba; Vai tro:Bên được bảo lãnh (Bên C); Công ty TNHH xây dựng thương mại Hoàng Long Phát; Giay phep KD:0309809847;  ,Phường 02, Quận 5, TP. Hồ Chí Minh
        //   - Ben:Bên thứ ba; Vai tro:Đại diện; Nguyễn Văn Tuấn; So CMT,HC:270099747; Ngay sinh:00/00/1972; Dia chi:  ,
        //   - Ben:Bên nhận thế chấp; Vai tro:Bên nhận thế chấp (Bên B); nh tmcp phương đông - cn tân thuận; Ma thue:000;  ,Phường Tân Định, Quận 1, TP. Hồ Chí Minh
        //   - Ben:Bên nhận thế chấp; Vai tro:Đại diện; nguyễn quốc khánh; So CMT,HC:000; Ngay sinh:00/00/1900; Dia chi:  ,`,
        //   [
        //     {
        //       address: '195/10E Điện Biên Phủ (So cu:242/3A ),Phường 15, Quận Bình Thạnh, TP. Hồ Chí Minh',
        //       users: [
        //         { displayName: 'nguyễn văn hậu; ', idNumber: '025176077' },
        //         { displayName: 'Công ty TNHH xây dựng thương mại Hoàng Long Phát; ', idNumber: '0309809847' },
        //         { displayName: 'Nguyễn Văn Tuấn; ', idNumber: '270099747' },
        //         { displayName: 'nh tmcp phương đông - cn tân thuận; ', idNumber: '000' },
        //         { displayName: 'nguyễn quốc khánh; ', idNumber: '000' },
        //       ],
        //     },
        //   ],
        // ],
        // [
        //   `(*) Nhóm HS:
        //   - Ủy quyền; So CC:54098; Phong CC: Phòng Công Chứng số 4; CC vien:; Ngay cap so: 20/12/2012
        // (*) Tài sản:
        //   - Nhà ở: ; So nha:66; So thua:1 phan thu; So to:13 66 Hồ Biểu Chánh, 11, Phú Nhuận, Tp. Hồ Chí Minh (So cu: ),
        // (*) Đương sự:
        //   - Ben:Bên nhận ủy quyền; Vai tro:Bên nhận ủy quyền (Bên B); Trần Quang Duy; So CMT,HC:212092828; Ngay sinh:00/00/1981; Dia chi:  ,
        //   - Ben:Bên ủy quyền; Vai tro:Bên ủy quyền (Bên A); Huỳnh Vĩ Nam; So CMT,HC:022235964; Ngay sinh:00/00/1967; Dia chi:  633/18/4M Lê Hồng Phong, phường 10, quận 10, Tp. HCM,`,
        //   [
        //     {
        //       address: '66 Hồ Biểu Chánh, 11, Phú Nhuận, Tp. Hồ Chí Minh',
        //       users: [
        //         { displayName: 'Trần Quang Duy', idNumber: '212092828' },
        //         { displayName: 'Huỳnh Vĩ Nam', idNumber: '022235964' },
        //       ],
        //     },
        //   ],
        // ],
        // [
        //   `(*) Nhóm HS:
        //   - * Nhom HS:HĐ thuê, mượn; So CC:21395; Phong CC: Vpcc Bình Thạnh; CC vien:Trần Anh Tuấn; Ngay cap so: 08/10/2015
        // (*) Tài sản:
        //   - Loai:Nhà ở, So cn:00, So nha:112 Lô số 4, Lô số 5, Khu biệt thự Kim Sơn, Nguyễn Văn Hưởng,Phường Thảo Điền,Quận 2,TP. Hồ Chí Minh
        // (*) Đương sự:
        //   - Ben:Bên cho thuê/ mượn; Vai tro:Bên cho thuê/ mượn (Bên A); Đào Mạnh Kháng; So CMT,HC:012073456; Ngay sinh://1969
        //   - Ben:Bên cho thuê/ mượn; Vai tro:Bên cho thuê/ mượn (Bên A); Vũ Thị Hương; So CMT,HC:012073511; Ngay sinh://1972
        //   - Ben:Bên thuê/ mượn; Vai tro:Bên thuê/mượn (Bên B); Phan Linh Giang; So CMT,HC:022442290; Ngay sinh://1972`,
        //   [
        //     {
        //       address:
        //         '112 Lô số 4, Lô số 5, Khu biệt thự Kim Sơn, Nguyễn Văn Hưởng,Phường Thảo Điền,Quận 2,TP. Hồ Chí Minh',
        //       users: [
        //         { displayName: 'Đào Mạnh Kháng', idNumber: '012073456' },
        //         { displayName: 'Vũ Thị Hương', idNumber: '012073511' },
        //         { displayName: 'Phan Linh Giang', idNumber: '022442290' },
        //       ],
        //     },
        //   ],
        // ],
        // [
        //   `(((*) Nhóm HS:
        //   - * Nhom HS:Thỏa thuận phân chia di sản thừa kế; So CC:005773; Phong CC: VPCC Nguyễn Thành Hưng (Tên cũ: Nguyễn Cảnh); CC vien:Nguyễn Thành Hưng; Ngay cap so: 24/09/2022
        // (*) Tài sản:
        //   - Loai:Đất không có tài sản, So cn:8823/97 So thua:4-410 So to:7-Saigon-Tân Định, So nha:235A ,Phường Võ Thị Sáu,Quận 3,TP. Hồ Chí Minh
        // (*) Đương sự:
        //   - Ben:Người nhường thừa kế; Vai tro:Con; BÙI THỊ XUÂN; So CMT,HC:079157006713; Ngay sinh://1957
        //   - Ben:Người nhường thừa kế; Vai tro:Con; Bùi Thị Phương, So CMT,HC:031146001009, Ngay sinh:00/00/1946 Thị trấn Tân Túc,Huyện Bình Chánh,TP. Hồ Chí Minh
        //   - Ben:Người được nhường thừa kế; Vai tro:Con; BÙI VIẾT NAM; So CMT,HC:079054003841; Ngay sinh://1954
        //   - Ben:Người nhường thừa kế; Vai tro:Con; BÙI THỊ THẢO; So CMT,HC:079151012634; Ngay sinh://1951
        //   - Ben:Người có liên quan; Vai tro:Người làm chứng; PHẠM HOÀNG HIẾU, So CMT,HC:066095015534, Ngay sinh:00/00/1995 Phường Trà Bá,Thành phố Pleiku,Tỉnh Gia Lai
        //   - Ben:Người để lại di sản; Vai tro:Người để lại di sản (không để lại di chúc); BÙI VIẾT BIỂN; So CMT,HC:; Ngay sinh://1920
        //   - Ben:Người để lại di sản; Vai tro:Người để lại di sản (không để lại di chúc); NGUYỄN THỊ BIÊN; So CMT,HC:; Ngay sinh://1918*) Nhóm HS:`,
        //   [
        //     {
        //       address: '235A ,Phường Võ Thị Sáu,Quận 3,TP. Hồ Chí Minh',
        //       users: [
        //         { displayName: 'BÙI THỊ XUÂN', idNumber: '079157006713' },
        //         { displayName: 'Bùi Thị Phương', idNumber: '031146001009' },
        //         { displayName: 'BÙI VIẾT NAM', idNumber: '079054003841' },
        //         { displayName: 'BÙI THỊ THẢO', idNumber: '079151012634' },
        //         { displayName: 'PHẠM HOÀNG HIẾU', idNumber: '066095015534' },
        //         { displayName: 'BÙI VIẾT BIỂN', idNumber: '' },
        //         { displayName: 'NGUYỄN THỊ BIÊN', idNumber: '' },
        //       ],
        //     },
        //   ],
        // ],
        [
          `(* (*) Nhóm HS:
           - * Nhom HS:Ủy quyền; So CC:16146; Phong CC: Vpcc Huỳnh Thị Ngọc Yến; CC vien:Huỳnh Thị Ngọc Yến; Ngay cap so: 05/10/2018
         (*) Tài sản:
           - Loai:Nhà ở So cn:0 Dia chi:802 Xô viết nghệ tĩnh,Phường 25,Quận Bình Thạnh,TP. Hồ Chí Minh
         (*) Đương sự:
           - Ben:Bên ủy quyền; Vai tro:Bên ủy quyền (Bên A); NGUYỄN THỊ HẰNG, So CMT,HC:079133000225, Ngay sinh:00/00/1933 Thị trấn Tân Túc,Huyện Bình Chánh,TP. Hồ Chí Minh
           - Ben:Bên ủy quyền; Vai tro:Bên ủy quyền (Bên A); Trần Thị Thanh Phượng, So CMT,HC:022269178, Ngay sinh:00/00/1965 Thị trấn Tân Túc,Huyện Bình Chánh,TP. Hồ Chí Minh
           - Ben:Bên ủy quyền; Vai tro:Bên ủy quyền (Bên A); Trần Thị Thanh Hồng, So CMT,HC:022269177, Ngay sinh:00/00/1967
           - Ben:Bên nhận ủy quyền; Vai tro:Bên nhận ủy quyền (Bên B); Nguyễn Thị Dung, So CMT,HC:079161003847, Ngay sinh:00/00/1961 Thị trấn Tân Túc,Huyện Bình Chánh,TP. Hồ Chí Minh
         (*) Nhóm HS:
           - * Nhom HS:HĐ thuê, mượn; So CC:030435; Phong CC: VPCC Hoàng Xuân Ngụ (Tên cũ: Hoàng Xuân); CC vien:Nguyễn Bắc Hải; Ngay cap so: 10/10/2022
        - Ghi chú: Hợp đồng cho ở nhờ một phần nhà thời hạn 20 năm
         (*) Tài sản:
           - Loai:Nhà ở So seri:DB449147 So vao so:CS15118 So thua:26 So to:3 Dia chi:38 Trần Cao Vân,Phường 06,Quận 3,TP. Hồ Chí Minh
         (*) Đương sự:
           - Ben:Bên cho thuê/ mượn; Vai tro:Bên cho thuê/ mượn (Bên A); nguyễn kiều hạnh, So CMT,HC:001168006101, Ngay sinh://0 Thị trấn Tân Túc,Huyện Bình Chánh,TP. Hồ Chí Minh
           - Ben:Bên thuê/ mượn; Vai tro:Bên thuê/mượn (Bên B); nguyễn khôi nguyên; So CMT,HC:001099000907; Ngay sinh://0; Dia chi: Thị trấn Tân Túc Huyện Bình Chánh TP. Hồ Chí Minh Đ thuê, mượn; So CC:11959; Phong CC: Phòng Công chứng số 6; CC vien:Đỗ Hoài Nam; Ngay cap so: 27/04/2015
        (*) Tài sản:
          - Loai:Đất có tài sản, So cn:CH00165 So thua:32 So to:3, So nha:19 Phan Đăng Lưu,Phường 03,Quận Bình Thạnh,TP. Hồ Chí Minh
        (*) Đương sự:
          - Ben:Bên cho thuê/ mượn; Vai tro:Bên cho thuê/ mượn (Bên A); Vũ Thành Công, So CMT,HC:023032455, Ngay sinh:00/00/1959
          - Ben:Bên cho thuê/ mượn; Vai tro:Bên cho thuê/ mượn (Bên A); Nguyễn Thị Loan; So CMT,HC:023038351; Ngay sinh:00/00/1972
          - Ben:Bên thuê/ mượn; Vai tro:Bên thuê/mượn (Bên B); thiều quang cường, So CMT,HC:025727667, Ngay sinh:00/00/1979 Thị trấn Tân Túc,Huyện Bình Chánh,TP. Hồ Chí Minh`,
          [
            {
              address: '802 Xô viết nghệ tĩnh,Phường 25,Quận Bình Thạnh,TP. Hồ Chí Minh',
              users: [
                { displayName: 'NGUYỄN THỊ HẰNG', idNumber: '079133000225' },
                { displayName: 'Trần Thị Thanh Phượng', idNumber: '022269178' },
                { displayName: 'Trần Thị Thanh Hồng', idNumber: '022269177' },
                { displayName: ' Nguyễn Thị Dung', idNumber: '079161003847' },
              ],
            },
            {
              address: '38 Trần Cao Vân,Phường 06,Quận 3,TP. Hồ Chí Minh',
              users: [
                { displayName: 'nguyễn kiều hạnh', idNumber: '001168006101' },
                { displayName: 'nguyễn khôi nguyên', idNumber: '001099000907' },
              ],
            },
            {
              address: '19 Phan Đăng Lưu,Phường 03,Quận Bình Thạnh,TP. Hồ Chí Minh',
              users: [
                { displayName: 'Vũ Thành Công', idNumber: '023032455' },
                { displayName: 'Nguyễn Thị Loan', idNumber: '023038351' },
                { displayName: 'thiều quang cường', idNumber: '025727667' },
              ],
            },
          ],
          // [
          //   {
          //     address: '802 Xô viết nghệ tĩnh,Phường 25,Quận Bình Thạnh,TP. Hồ Chí Minh',
          //     users: [
          //       { displayName: 'NGUYỄN THỊ HẰNG, ', idNumber: '079133000225' },
          //       { displayName: 'Trần Thị Thanh Phượng, ', idNumber: '022269178' },
          //       { displayName: 'Trần Thị Thanh Hồng, ', idNumber: '022269177' },
          //       { displayName: 'Nguyễn Thị Dung, ', idNumber: '079161003847' },
          //       { displayName: 'nguyễn kiều hạnh, ', idNumber: '001168006101' },
          //       { displayName: 'nguyễn khôi nguyên; ', idNumber: '001099000907' },
          //       { displayName: 'Vũ Thành Công, ', idNumber: '023032455' },
          //       { displayName: 'Nguyễn Thị Loan; ', idNumber: '023038351' },
          //       { displayName: 'thiều quang cường, ', idNumber: '025727667' },
          //     ],
          //   },
          // ],
        ],
        // [
        //   `(*) Nhóm HS:
        //   - HĐ thuê, mượn; So CC:751; Phong CC: PCC1; CC vien:Nguyễn Văn Hòa; Ngay cap so: 09/01/2013
        // (*) Tài sản:
        //   - Nhà ở: ; So nha:5 5 Phan Kế Bính, Phường Ða Kao, Quận 1, Tp. Hồ Chí Minh (So cu: ),
        // (*) Đương sự:
        //   - Ben:Bên thuê/ mượn; Vai tro:Bên thuê/mượn (Bên B); công ty tnhh hoa sen vàng long an;  ,
        //   - Ben:Bên cho thuê/ mượn; Vai tro:Bên cho thuê/ mượn (Bên A); Nguyễn Thị Ngọc Diệp; So CMT,HC:020965647; Ngay sinh:01/01/3000; Dia chi:  ,`,
        //   [
        //     {
        //       address: '5 Phan Kế Bính, Phường Ða Kao, Quận 1, Tp. Hồ Chí Minh',
        //       users: [
        //         { displayName: 'công ty tnhh hoa sen vàng long an', idNumber: '' },
        //         { displayName: 'Nguyễn Thị Ngọc Diệp', idNumber: '020965647' },
        //       ],
        //     },
        //   ],
        // ],
        // [
        //   `(*) Nhóm HS:
        //   - * Nhom HS:Ủy quyền; So CC:000382; Phong CC: VPCC Nguyễn Đình Thịnh; CC vien:Chu Hải An; Ngay cap so: 25/02/2023
        // - Ghi chú: Ủy quyền thực hiện theo Hợp đồng UQ lập ngày 22/09/2022
        // (*) Tài sản:
        //   - Loai:Nhà ở So seri:. So vao so:13722/2002 Dia chi:206 VÕ THỊ SÁU,Phường 07,Quận 3,TP. Hồ Chí Minh
        // (*) Đương sự:
        //   - Ben:Bên ủy quyền; Vai tro:Bên ủy quyền (Bên A); CTY CP XNK VĨNH LONG, Ma thue:1500171478, QD T.lap:, Giay phep KD:, Xã Trường An,Thành phố Vĩnh Long,Tỉnh Vĩnh Long
        //   - Ben:Bên ủy quyền; Vai tro:Đại diện; TRẦN VĨNH PHONG, So CMT,HC:079062005094, Ngay sinh:00/00/1962
        //   - Ben:Bên ủy quyền; Vai tro:Đại diện; Trương Quang Khải, So CMT,HC:049029000024, Ngay sinh:00/00/1929, Dia chi: 61 đường Trần Quang Diệu,Phường 14,Quận 3,TP. Hồ Chí Minh
        //   - Ben:Bên nhận ủy quyền; Vai tro:Bên nhận ủy quyền (Bên B); TRƯƠNG QUANG LONG TRIỀU, So CMT,HC:079069024048, Ngay sinh://1969, Dia chi: 2/1 Cao Thắng Phường 05 Quận 3 TP. Hồ Chí Minh`,
        //   [
        //     {
        //       address: '206 VÕ THỊ SÁU,Phường 07,Quận 3,TP. Hồ Chí Minh',
        //       users: [
        //         { displayName: 'CTY CP XNK VĨNH LONG', idNumber: '1500171478' },
        //         { displayName: 'TRẦN VĨNH PHONG', idNumber: '079062005094' },
        //         { displayName: 'Trương Quang Khải', idNumber: '049029000024' },
        //         { displayName: 'TRƯƠNG QUANG LONG TRIỀU', idNumber: '079069024048' },
        //       ],
        //     },
        //   ],
        // ],
        // [
        //   `(*) Nhóm HS:
        //   - * Nhom HS:Thế chấp; So CC:009601; Phong CC: VPCC Mai Việt Cường (Tên cũ: Phạm Thùy Nhiên Hương); CC vien:Lê Cảnh Lai; Ngay cap so: 30/05/2019
        // (*) Tài sản:
        //   - Loai:Nhà ở So cn:2834/97 So thua:65 So to:36 Dia chi:22 yên Thế,Phường 02,Quận Tân Bình,TP. Hồ Chí Minh
        // (*) Đương sự:
        //   - Ben:Bên thế chấp; Vai tro:Bên thế chấp (Bên A); Ninh Tiến Đạt, So CMT,HC:079072007930, Ngay sinh:00/00/1972, Dia chi: 98/180 Hàn Mặc Tử, P.12, Q.Tân Bình, TP. HCM
        //   - Ben:Bên nhận thế chấp; Vai tro:Bên nhận thế chấp (Bên B); Ngân hàng TMCP Ngoại Thương Việt Nam-CN Thủ Đức-PGD Tam Bình, Ma thue:, QD T.lap:, Giay phep KD:079072007930, Dia chi:616 Tô Ngọc Vân, Phường Tam Bình,Quận Thủ Đức,TP. Hồ Chí Minh
        // (*) Giải chấp:
        //   -
        // * Ngay GC:23/07/2019; So GC:09/TB-TĐU-KH; CC vien:Giải chấp; Phong CC:Văn phòng công chứng Mai Việt Cường`,
        //   [
        //     {
        //       address: '22 yên Thế,Phường 02,Quận Tân Bình,TP. Hồ Chí Minh',
        //       users: [
        //         { displayName: 'Ninh Tiến Đạt', idNumber: '079072007930' },
        //         {
        //           displayName: 'Ngân hàng TMCP Ngoại Thương Việt Nam-CN Thủ Đức-PGD Tam Bình',
        //           idNumber: '079072007930',
        //         },
        //       ],
        //     },
        //   ],
        // ],
        // [
        //   `(*) Nhóm HS:
        //   - * Nhom HS:HĐ thuê, mượn; So CC:016096; Phong CC: VPCC Hoàng Xuân Ngụ (Tên cũ: Hoàng Xuân); CC vien:Lê Chí Thắng; Ngay cap so: 18/06/2020
        // - Ghi chú: Hợp đồng thuê toàn bộ nhà thời hạn 05 năm đến ngày 30/06/2025
        // (*) Tài sản:
        //   - Loai:Nhà ở So cn:CS15126 So thua:408 So to:28 Dia chi:18A Kỳ Đồng (Dia chi cu:20/6B (tầng 1)  ),Phường 09,Quận 3,TP. Hồ Chí Minh
        // (*) Đương sự:
        //   - Ben:Bên cho thuê/ mượn; Vai tro:Bên cho thuê/ mượn (Bên A); lê thị hồng; So CMT,HC:051157000106; Ngay sinh://0 Thị trấn Tân Túc,Huyện Bình Chánh,TP. Hồ Chí Minh
        //   - Ben:Bên cho thuê/ mượn; Vai tro:Bên cho thuê/ mượn (Bên A); lê văn thuyên; So CMT,HC:051055000244; Ngay sinh://0 Thị trấn Tân Túc,Huyện Bình Chánh,TP. Hồ Chí Minh
        //   - Ben:Bên thuê/ mượn; Vai tro:Bên thuê/mượn (Bên B); CTY CP HƯNG THỊNH LAND (TÊN CŨ: Công ty Cổ phần Sàn giao dịch Bất động sản Hưng Thịnh); Ma thue:0302588518; QD T.lap:; Giay phep KD:0302588518; Dia chi:526, Phường 07,Quận 10,TP. Hồ Chí Minh
        //   - Ben:Bên thuê/ mượn; Vai tro:Đại diện; ĐẶNG VIỆT TÚ UYÊN; So CMT,HC:023166113; Ngay sinh:00/00/1978`,
        //   [
        //     {
        //       address: '18A Kỳ Đồng (Dia chi cu:20/6B (tầng 1)  ),Phường 09,Quận 3,TP. Hồ Chí Minh',
        //       users: [
        //         { displayName: 'lê thị hồng', idNumber: '051157000106' },
        //         { displayName: 'lê văn thuyên', idNumber: '051055000244' },
        //         { displayName: 'CTY CP HƯNG THỊNH LAND', idNumber: '0302588518' },
        //         { displayName: 'ĐẶNG VIỆT TÚ UYÊ', idNumber: '023166113' },
        //       ],
        //     },
        //   ],
        // ],
      ])(`should return correct premise detail`, (content, expected) => {
        const details = extractPremiseDetail(content);
        expect(details.length).toEqual(expected.length);
        for (let i = 0; i < details.length; i++) {
          expect(matchSubstring(details[i].address, expected[i].address)).toEqual(expected[i].address);

          expect(details[i].users.length).toEqual(expected[i].users.length);
          for (let j = 0; j < details[i].users.length; j++) {
            expect(matchSubstring(details[i].users[j].displayName, expected[i].users[j].displayName)).toEqual(
              expected[i].users[j].displayName,
            );
            expect(matchSubstring(details[i].users[j].idNumber, expected[i].users[j].idNumber)).toEqual(
              expected[i].users[j].idNumber,
            );
          }
        }
      });
    });
  });
});
