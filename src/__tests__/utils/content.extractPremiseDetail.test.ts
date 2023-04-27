import { extractPremiseDetail } from '../../helpers/content';
import { matchSubstring } from '../../helpers/strings';

// describe utils.content.extractPremiseDetail
describe('utils', () => {
  describe('content', () => {
    describe('extractPremiseDetail', () => {
      it.each([
        [
          `
        (*) Nhóm HS:
         - * Nhom HS:Ủy quyền; So CC:005881; Phong CC: VPCC Văn Thị Mỹ Đức; CC vien:Cao Hoàng Lân; Ngay cap so: 29/06/2021
        - Ghi chú: xin phép xây dựng sửa chữa
         (*) Tài sản:
         - Loai:Nhà ở So seri:0 So vao so:2154/2007/UB-GCN Dia chi:A65(Phải) Nguyễn Trãi,Phường Nguyễn Cư Trinh,Quận 1,TP. Hồ Chí Minh
        (*) Đương sự:
          - Ben:Bên ủy quyền; Vai tro:Bên ủy quyền (Bên A); NGUYỄN CÔNG MINH, So CMT,HC:079055000834, Ngay sinh:00/00/1955
          - Ben:Bên ủy quyền; Vai tro:Bên ủy quyền (Bên A); Đoàn Thị Kim Chi, So CMT,HC:079155000278, Ngay sinh:00/00/1955
          - Ben:Bên nhận ủy quyền; Vai tro:Bên nhận ủy quyền (Bên B); Đinh Thị Thu Thủy, So CMT,HC:023845562, Ngay sinh:00/00/1984`,
          [
            {
              addresses: ['A65(Phải) Nguyễn Trãi,Phường Nguyễn Cư Trinh,Quận 1,TP. Hồ Chí Minh'],
              users: [
                { displayName: 'NGUYỄN CÔNG MINH', idNumber: '079055000834' },
                { displayName: 'Đoàn Thị Kim Chi', idNumber: '079155000278' },
                { displayName: 'Đinh Thị Thu Thủy', idNumber: '023845562' },
              ],
            },
          ],
        ],
        [
          `(*) Nhóm HS:
          - Sửa đổi, bổ sung HĐ thế chấp; So CC:8315; Phong CC: PCC1; CC vien:Văn Thị Mỹ Đức; Ngay cap so: 18/04/2014
        (*) Tài sản:
          - Đất không có tài sản: ; So cn:H10528; So nha:195/10E Điện Biên Phủ (So cu:242/3A ),Phường 15, Quận Bình Thạnh, TP. Hồ Chí Minh
        (*) Đương sự:
          - Ben:Bên thế chấp; Vai tro:Bên thế chấp (Bên A); nguyễn văn hậu; So CMT,HC:025176077; Ngay sinh:01/01/3000; Dia chi:  ,
          - Ben:Bên thứ ba; Vai tro:Bên được bảo lãnh (Bên C); Công ty TNHH xây dựng thương mại Hoàng Long Phát; Ma thue:0309809847;  ,Phường 02, Quận 5, TP. Hồ Chí Minh
          - Ben:Bên thứ ba; Vai tro:Đại diện; Nguyễn Văn Tuấn; So CMT,HC:270099747; Ngay sinh:00/00/1972; Dia chi:  ,
          - Ben:Bên nhận thế chấp; Vai tro:Bên nhận thế chấp (Bên B); nh tmcp phương đông - cn tân thuận; Ma thue:000;  ,Phường Tân Định, Quận 1, TP. Hồ Chí Minh
          - Ben:Bên nhận thế chấp; Vai tro:Đại diện; nguyễn quốc khánh; So CMT,HC:000; Ngay sinh:00/00/1900; Dia chi:  ,`,
          [
            {
              addresses: ['195/10E Điện Biên Phủ (So cu:242/3A ),Phường 15, Quận Bình Thạnh, TP. Hồ Chí Minh'],
              users: [
                { displayName: 'nguyễn văn hậu', idNumber: '025176077' },
                { displayName: 'Công ty TNHH xây dựng thương mại Hoàng Long Phát', idNumber: '0309809847' },
                { displayName: 'Nguyễn Văn Tuấn', idNumber: '270099747' },
                { displayName: 'nh tmcp phương đông - cn tân thuận', idNumber: '000' },
                { displayName: 'nguyễn quốc khánh', idNumber: '000' },
              ],
            },
          ],
        ],
        [
          `(*) Nhóm HS:
         - Ủy quyền; So CC:54098; Phong CC: Phòng Công Chứng số 4; CC vien:; Ngay cap so: 20/12/2012
        (*) Tài sản:
          - Nhà ở: ; So nha:66; So thua:1 phan thu; So to:13 66 Hồ Biểu Chánh, 11, Phú Nhuận, Tp. Hồ Chí Minh (So cu: ),
        (*) Đương sự:
          - Ben:Bên nhận ủy quyền; Vai tro:Bên nhận ủy quyền (Bên B); Trần Quang Duy; So CMT,HC:212092828; Ngay sinh:00/00/1981; Dia chi:  ,
          - Ben:Bên ủy quyền; Vai tro:Bên ủy quyền (Bên A); Huỳnh Vĩ Nam; So CMT,HC:022235964; Ngay sinh:00/00/1967; Dia chi:  633/18/4M Lê Hồng Phong, phường 10, quận 10, Tp. HCM,`,
          [
            {
              addresses: ['66 Hồ Biểu Chánh, 11, Phú Nhuận, Tp. Hồ Chí Minh'],
              users: [
                { displayName: 'Trần Quang Duy', idNumber: '212092828' },
                { displayName: 'Huỳnh Vĩ Nam', idNumber: '022235964' },
              ],
            },
          ],
        ],
        [
          `(*) Nhóm HS:
          - * Nhom HS:HĐ thuê, mượn; So CC:21395; Phong CC: Vpcc Bình Thạnh; CC vien:Trần Anh Tuấn; Ngay cap so: 08/10/2015
        (*) Tài sản:
          - Loai:Nhà ở, So cn:00, So nha:112 Lô số 4, Lô số 5, Khu biệt thự Kim Sơn, Nguyễn Văn Hưởng,Phường Thảo Điền,Quận 2,TP. Hồ Chí Minh
        (*) Đương sự:
          - Ben:Bên cho thuê/ mượn; Vai tro:Bên cho thuê/ mượn (Bên A); Đào Mạnh Kháng; So CMT,HC:012073456; Ngay sinh://1969
          - Ben:Bên cho thuê/ mượn; Vai tro:Bên cho thuê/ mượn (Bên A); Vũ Thị Hương; So CMT,HC:012073511; Ngay sinh://1972
          - Ben:Bên thuê/ mượn; Vai tro:Bên thuê/mượn (Bên B); Phan Linh Giang; So CMT,HC:022442290; Ngay sinh://1972`,
          [
            {
              addresses: [
                '112 Lô số 4, Lô số 5, Khu biệt thự Kim Sơn, Nguyễn Văn Hưởng,Phường Thảo Điền,Quận 2,TP. Hồ Chí Minh',
              ],
              users: [
                { displayName: 'Đào Mạnh Kháng', idNumber: '012073456' },
                { displayName: 'Vũ Thị Hương', idNumber: '012073511' },
                { displayName: 'Phan Linh Giang', idNumber: '022442290' },
              ],
            },
          ],
        ],
        [
          `(((*) Nhóm HS:
          - * Nhom HS:Thỏa thuận phân chia di sản thừa kế; So CC:005773; Phong CC: VPCC Nguyễn Thành Hưng (Tên cũ: Nguyễn Cảnh); CC vien:Nguyễn Thành Hưng; Ngay cap so: 24/09/2022
        (*) Tài sản:
          - Loai:Đất không có tài sản, So cn:8823/97 So thua:4-410 So to:7-Saigon-Tân Định, So nha:235A ,Phường Võ Thị Sáu,Quận 3,TP. Hồ Chí Minh
        (*) Đương sự:
          - Ben:Người nhường thừa kế; Vai tro:Con; BÙI THỊ XUÂN; So CMT,HC:079157006713; Ngay sinh://1957
          - Ben:Người nhường thừa kế; Vai tro:Con; Bùi Thị Phương, So CMT,HC:031146001009, Ngay sinh:00/00/1946 Thị trấn Tân Túc,Huyện Bình Chánh,TP. Hồ Chí Minh
          - Ben:Người được nhường thừa kế; Vai tro:Con; BÙI VIẾT NAM; So CMT,HC:079054003841; Ngay sinh://1954
          - Ben:Người nhường thừa kế; Vai tro:Con; BÙI THỊ THẢO; So CMT,HC:079151012634; Ngay sinh://1951
          - Ben:Người có liên quan; Vai tro:Người làm chứng; PHẠM HOÀNG HIẾU, So CMT,HC:066095015534, Ngay sinh:00/00/1995 Phường Trà Bá,Thành phố Pleiku,Tỉnh Gia Lai`,
          [
            {
              addresses: ['235A ,Phường Võ Thị Sáu,Quận 3,TP. Hồ Chí Minh'],
              users: [
                { displayName: 'BÙI THỊ XUÂN', idNumber: '079157006713' },
                { displayName: 'Bùi Thị Phương', idNumber: '031146001009' },
                { displayName: 'BÙI VIẾT NAM', idNumber: '079054003841' },
                { displayName: 'BÙI THỊ THẢO', idNumber: '079151012634' },
                { displayName: 'PHẠM HOÀNG HIẾU', idNumber: '066095015534' },
              ],
            },
          ],
        ],
        [
          `(*) Nhóm HS:
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
                (*) Tài sản:
                 - Loai:Đất có tài sản, So cn:CH00165 So thua:32 So to:3, So nha:19 Phan Đăng Lưu,Phường 03,Quận Bình Thạnh,TP. Hồ Chí Minh
                (*) Đương sự:
                  - Ben:Bên cho thuê/ mượn; Vai tro:Bên cho thuê/ mượn (Bên A); Vũ Thành Công, So CMT,HC:023032455, Ngay sinh:00/00/1959
                  - Ben:Bên cho thuê/ mượn; Vai tro:Bên cho thuê/ mượn (Bên A); Nguyễn Thị Loan; So CMT,HC:023038351; Ngay sinh:00/00/1972
                  - Ben:Bên thuê/ mượn; Vai tro:Bên thuê/mượn (Bên B); thiều quang cường, So CMT,HC:025727667, Ngay sinh:00/00/1979 Thị trấn Tân Túc,Huyện Bình Chánh,TP. Hồ Chí Minh`,
          [
            {
              addresses: ['802 Xô viết nghệ tĩnh,Phường 25,Quận Bình Thạnh,TP. Hồ Chí Minh'],
              users: [
                { displayName: 'NGUYỄN THỊ HẰNG', idNumber: '079133000225' },
                { displayName: 'Trần Thị Thanh Phượng', idNumber: '022269178' },
                { displayName: 'Trần Thị Thanh Hồng', idNumber: '022269177' },
                { displayName: 'Nguyễn Thị Dung', idNumber: '079161003847' },
              ],
            },
            {
              addresses: ['38 Trần Cao Vân,Phường 06,Quận 3,TP. Hồ Chí Minh'],
              users: [
                { displayName: 'nguyễn kiều hạnh', idNumber: '001168006101' },
                { displayName: 'nguyễn khôi nguyên', idNumber: '001099000907' },
              ],
            },
            {
              addresses: ['19 Phan Đăng Lưu,Phường 03,Quận Bình Thạnh,TP. Hồ Chí Minh'],
              users: [
                { displayName: 'Vũ Thành Công', idNumber: '023032455' },
                { displayName: 'Nguyễn Thị Loan', idNumber: '023038351' },
                { displayName: 'thiều quang cường', idNumber: '025727667' },
              ],
            },
          ],
        ],
        [
          `(*) Nhóm HS:
          - * Nhom HS:Ủy quyền; So CC:000382; Phong CC: VPCC Nguyễn Đình Thịnh; CC vien:Chu Hải An; Ngay cap so: 25/02/2023
        - Ghi chú: Ủy quyền thực hiện theo Hợp đồng UQ lập ngày 22/09/2022
        (*) Tài sản:
          - Loai:Nhà ở So seri:. So vao so:13722/2002 Dia chi:206 VÕ THỊ SÁU,Phường 07,Quận 3,TP. Hồ Chí Minh
        (*) Đương sự:
          - Ben:Bên ủy quyền; Vai tro:Bên ủy quyền (Bên A); CTY CP XNK VĨNH LONG, Ma thue:1500171478, QD T.lap:, Giay phep KD:, Xã Trường An,Thành phố Vĩnh Long,Tỉnh Vĩnh Long
          - Ben:Bên ủy quyền; Vai tro:Đại diện; TRẦN VĨNH PHONG, So CMT,HC:079062005094, Ngay sinh:00/00/1962
          - Ben:Bên ủy quyền; Vai tro:Đại diện; Trương Quang Khải, So CMT,HC:049029000024, Ngay sinh:00/00/1929, Dia chi: 61 đường Trần Quang Diệu,Phường 14,Quận 3,TP. Hồ Chí Minh
          - Ben:Bên nhận ủy quyền; Vai tro:Bên nhận ủy quyền (Bên B); TRƯƠNG QUANG LONG TRIỀU, So CMT,HC:079069024048, Ngay sinh://1969, Dia chi: 2/1 Cao Thắng Phường 05 Quận 3 TP. Hồ Chí Minh`,
          [
            {
              addresses: ['206 VÕ THỊ SÁU,Phường 07,Quận 3,TP. Hồ Chí Minh'],
              users: [
                { displayName: 'CTY CP XNK VĨNH LONG', idNumber: '1500171478' },
                { displayName: 'TRẦN VĨNH PHONG', idNumber: '079062005094' },
                { displayName: 'Trương Quang Khải', idNumber: '049029000024' },
                { displayName: 'TRƯƠNG QUANG LONG TRIỀU', idNumber: '079069024048' },
              ],
            },
          ],
        ],
        [
          `(*) Nhóm HS:
          - * Nhom HS:Thế chấp; So CC:009601; Phong CC: VPCC Mai Việt Cường (Tên cũ: Phạm Thùy Nhiên Hương); CC vien:Lê Cảnh Lai; Ngay cap so: 30/05/2019
        (*) Tài sản:
          - Loai:Nhà ở So cn:2834/97 So thua:65 So to:36 Dia chi:22 yên Thế,Phường 02,Quận Tân Bình,TP. Hồ Chí Minh
        (*) Đương sự:
          - Ben:Bên thế chấp; Vai tro:Bên thế chấp (Bên A); Ninh Tiến Đạt, So CMT,HC:079072007930, Ngay sinh:00/00/1972, Dia chi: 98/180 Hàn Mặc Tử, P.12, Q.Tân Bình, TP. HCM
          - Ben:Bên nhận thế chấp; Vai tro:Bên nhận thế chấp (Bên B); Ngân hàng TMCP Ngoại Thương Việt Nam-CN Thủ Đức-PGD Tam Bình, Ma thue:, QD T.lap:, Giay phep KD:079072007930, Dia chi:616 Tô Ngọc Vân, Phường Tam Bình,Quận Thủ Đức,TP. Hồ Chí Minh
        (*) Giải chấp:
          -
        * Ngay GC:23/07/2019; So GC:09/TB-TĐU-KH; CC vien:Giải chấp; Phong CC:Văn phòng công chứng Mai Việt Cường`,
          [
            {
              addresses: ['22 yên Thế,Phường 02,Quận Tân Bình,TP. Hồ Chí Minh'],
              users: [
                { displayName: 'Ninh Tiến Đạt', idNumber: '079072007930' },
                {
                  displayName: 'Ngân hàng TMCP Ngoại Thương Việt Nam-CN Thủ Đức-PGD Tam Bình',
                  idNumber: '079072007930',
                },
              ],
            },
          ],
        ],
        [
          `(*) Nhóm HS:
          - * Nhom HS:HĐ thuê, mượn; So CC:016096; Phong CC: VPCC Hoàng Xuân Ngụ (Tên cũ: Hoàng Xuân); CC vien:Lê Chí Thắng; Ngay cap so: 18/06/2020
        - Ghi chú: Hợp đồng thuê toàn bộ nhà thời hạn 05 năm đến ngày 30/06/2025
        (*) Tài sản:
          - Loai:Nhà ở So cn:CS15126 So thua:408 So to:28 Dia chi:18A Kỳ Đồng (Dia chi cu:20/6B (tầng 1)  ),Phường 09,Quận 3,TP. Hồ Chí Minh
        (*) Đương sự:
          - Ben:Bên cho thuê/ mượn; Vai tro:Bên cho thuê/ mượn (Bên A); lê thị hồng; So CMT,HC:051157000106; Ngay sinh://0 Thị trấn Tân Túc,Huyện Bình Chánh,TP. Hồ Chí Minh
          - Ben:Bên cho thuê/ mượn; Vai tro:Bên cho thuê/ mượn (Bên A); lê văn thuyên; So CMT,HC:051055000244; Ngay sinh://0 Thị trấn Tân Túc,Huyện Bình Chánh,TP. Hồ Chí Minh
          - Ben:Bên thuê/ mượn; Vai tro:Bên thuê/mượn (Bên B); CTY CP HƯNG THỊNH LAND (TÊN CŨ: Công ty Cổ phần Sàn giao dịch Bất động sản Hưng Thịnh); Ma thue:0302588518; QD T.lap:; Giay phep KD:0302588518; Dia chi:526, Phường 07,Quận 10,TP. Hồ Chí Minh
          - Ben:Bên thuê/ mượn; Vai tro:Đại diện; ĐẶNG VIỆT TÚ UYÊN; So CMT,HC:023166113; Ngay sinh:00/00/1978`,
          [
            {
              addresses: ['18A Kỳ Đồng (Dia chi cu:20/6B (tầng 1)  ),Phường 09,Quận 3,TP. Hồ Chí Minh'],
              users: [
                { displayName: 'lê thị hồng', idNumber: '051157000106' },
                { displayName: 'lê văn thuyên', idNumber: '051055000244' },
                {
                  displayName: 'CTY CP HƯNG THỊNH LAND (TÊN CŨ: Công ty Cổ phần Sàn giao dịch Bất động sản Hưng Thịnh)',
                  idNumber: '0302588518',
                },
                { displayName: 'ĐẶNG VIỆT TÚ UYÊN', idNumber: '023166113' },
              ],
            },
          ],
        ],
        [
          `(*) Nhóm HS:
            - * Nhom HS:Thế chấp vay bổ sung; So CC:022134; Phong CC: Vpcc Sài Gòn; CC vien:Trần Khánh Chi; Ngay cap so: 09/10/2017
          (*) Tài sản:
            - Loai:Nhà ở So cn:CS00679 Dia chi:73-75 Thủ Khoa Huân,Phường Bến Thành,Quận 1,TP. Hồ Chí Minh
          (*) Đương sự:
            - Ben:Bên thế chấp; Vai tro:Bên thế chấp (Bên A); Nguyễn Thị Lan, So CMT,HC:023822496, Ngay sinh:00/00/1958
            - Ben:Bên thế chấp; Vai tro:Bên thế chấp (Bên A); Trần Văn Bằng, So CMT,HC:022763595, Ngay sinh:00/00/1955
            - Ben:Bên nhận thế chấp; Vai tro:Bên nhận thế chấp (Bên B); Ngân Hàng TMCP Á Châu, Ma thue:12342, QD T.lap:, Giay phep KD:, Phường 05,Quận 3,TP. Hồ Chí Minh
            - Ben:Bên nhận thế chấp; Vai tro:Đại diện; Nguyễn Tiến Dũng, So CMT,HC:183389204, Ngay sinh:00/00/1984
          (*) Giải chấp:
            -
            * Ngay GC:19/12/2017; So GC:160; CC vien:Giải chấp; Phong CC:Văn phòng công chứng Sài Gòn`,
          [
            {
              addresses: ['73-75 Thủ Khoa Huân,Phường Bến Thành,Quận 1,TP. Hồ Chí Minh'],
              users: [
                { displayName: 'Nguyễn Thị Lan', idNumber: '023822496' },
                { displayName: 'Trần Văn Bằng', idNumber: '022763595' },
                {
                  displayName: 'Ngân Hàng TMCP Á Châu',
                  idNumber: '12342',
                },
                { displayName: 'Nguyễn Tiến Dũng', idNumber: '183389204' },
              ],
            },
          ],
        ],
        [
          `(*) Nhóm HS:
           - * Nhom HS:Thế chấp; So CC:4423; Phong CC: Phòng Công Chứng số 4; CC vien:Hồ Xuân Hương; Ngay cap so: 30/01/2018
         (*) Tài sản:
           - Loai:Nhà ở So cn:416/GCN-2004 So thua:31 So to:11 Dia chi:95B Trần Quang Diệu (nối dài),Phường 13,Quận 3,TP. Hồ Chí Minh
         (*) Đương sự:
           - Ben:Bên thế chấp; Vai tro:Bên thế chấp (Bên A); Trần Thị Ngọc Dung, So CMT,HC:079175002012, Ngay sinh:00/00/1975
           - Ben:Bên nhận thế chấp; Vai tro:Bên nhận thế chấp (Bên B); Ngân Hàng TMCP Á Châu, Ma thue:, QD T.lap:, Giay phep KD:12442, Phường 05,Quận 3,TP. Hồ Chí Minh
         (*) Giải chấp:
           -
        * Ngay GC:03/03/2021; So GC:1384; CC vien:Giải chấp công chứng 4; Phong CC:Phòng Công Chứng số 4
         (*) Nhóm HS:
           - * Nhom HS:Sửa đổi, bổ sung HĐ thế chấp; So CC:4424; Phong CC: Phòng Công Chứng số 4; CC vien:Hồ Xuân Hương; Ngay cap so: 30/01/2018
         (*) Tài sản:
           - Loai:Nhà ở So cn:2173/2007/GCN Dia chi:97-99 Trần Quang Diệu,Phường 13,Quận 3,TP. Hồ Chí Minh
         (*) Đương sự:
           - Ben:Bên thế chấp; Vai tro:Bên thế chấp (Bên A); Trần Thị Ngọc Dung, So CMT,HC:079175002012, Ngay sinh:00/00/1975
           - Ben:Bên nhận thế chấp; Vai tro:Bên nhận thế chấp (Bên B); Ngân Hàng TMCP Á Châu, Ma thue:, QD T.lap:, Giay phep KD:12442, Phường 05,Quận 3,TP. Hồ Chí Minh
         (*) Giải chấp:
           -
        * Ngay GC:03/03/2021; So GC:1394; CC vien:Giải chấp công chứng 4; Phong CC:Phòng Công Chứng số 4`,
          [
            {
              addresses: ['95B Trần Quang Diệu (nối dài),Phường 13,Quận 3,TP. Hồ Chí Minh'],
              users: [
                { displayName: 'Trần Thị Ngọc Dung', idNumber: '079175002012' },
                { displayName: 'Ngân Hàng TMCP Á Châu', idNumber: '12442' },
              ],
            },
            {
              addresses: ['97-99 Trần Quang Diệu,Phường 13,Quận 3,TP. Hồ Chí Minh'],
              users: [
                { displayName: 'Trần Thị Ngọc Dung', idNumber: '079175002012' },
                { displayName: 'Ngân Hàng TMCP Á Châu', idNumber: '12442' },
              ],
            },
          ],
        ],
        [
          `(*) Nhóm HS:
            - * Nhom HS:Thế chấp vay bổ sung; So CC:022134; Phong CC: Vpcc Sài Gòn; CC vien:Trần Khánh Chi; Ngay cap so: 09/10/2017
          (*) Tài sản:
            - Loai:Nhà ở So cn:CS00679 Dia chi:73-75 Thủ Khoa Huân,Phường Bến Thành,Quận 1,TP. Hồ Chí Minh
          (*) Đương sự:
            - Ben:Bên thế chấp; Vai tro:Bên thế chấp (Bên A); Nguyễn Thị Linh
            - Ben:Bên thế chấp; Vai tro:Bên thế chấp (Bên A); Nguyễn Thị Lan, So CMT,HC:023822496, Ngay sinh:00/00/1958
            - Ben:Bên thế chấp; Vai tro:Bên thế chấp (Bên A); Trần Văn Bằng, So CMT,HC:, Ngay sinh:00/00/1955
            - Ben:Bên nhận thế chấp; Vai tro:Bên nhận thế chấp (Bên B); Công ty TNHH Một thành viên Bột dinh dưỡng Thăng Long
            - Ben:Bên nhận thế chấp; Vai tro:Bên nhận thế chấp (Bên B); Công ty Cổ phần Tập Đoàn Đầu tư Địa Ốc No Va, Ma thue:0312112125, Phường 05,Quận 3,TP. Hồ Chí Minh
            - Ben:Bên nhận thế chấp; Vai tro:Bên nhận thế chấp (Bên B);  CÔNG TY CỔ PHẦN ĐẦU TƯ VÀ PHÁT TRIỂN XÂY DỰNG, Giay phep KD:0312283473, Phường 05,Quận 3,TP. Hồ Chí Minh
            - Ben:Bên nhận thế chấp; Vai tro:Bên nhận thế chấp (Bên B); CÔNG TY TNHH CÔNG NGHIỆP, Ma thue:0312283473, QD T.lap:, Giay phep KD:, Phường 05,Quận 3,TP. Hồ Chí Minh
            - Ben:Bên nhận thế chấp; Vai tro:Bên nhận thế chấp (Bên B); Công ty TNHH Cửa Hàng Tiện Lợi Gia Đình Việt Nam, Ma thue:, QD T.lap:, Giay phep KD:YHFTR56, Phường 05,Quận 3,TP. Hồ Chí Minh
            - Ben:Bên nhận thế chấp; Vai tro:Bên nhận thế chấp (Bên B); Ngân Hàng TMCP Á Châu, Ma thue:0312112125, QD T.lap:, Giay phep KD:YHFTR56, Phường 05,Quận 3,TP. Hồ Chí Minh
            - Ben:Bên nhận thế chấp; Vai tro:Bên nhận thế chấp (Bên B); Công Ty Cổ Phần Dự Kim, Ma thue:, QD T.lap:, Giay phep KD:, Phường 05,Quận 3,TP. Hồ Chí Minh`,
          [
            {
              addresses: ['73-75 Thủ Khoa Huân,Phường Bến Thành,Quận 1,TP. Hồ Chí Minh'],
              users: [
                { displayName: 'Nguyễn Thị Linh', idNumber: '' },
                { displayName: 'Nguyễn Thị Lan', idNumber: '023822496' },
                { displayName: 'Trần Văn Bằng', idNumber: '' },
                { displayName: 'Công ty TNHH Một thành viên Bột dinh dưỡng Thăng Long', idNumber: '' },
                { displayName: 'Công ty Cổ phần Tập Đoàn Đầu tư Địa Ốc No Va', idNumber: '0312112125' },
                { displayName: 'CÔNG TY CỔ PHẦN ĐẦU TƯ VÀ PHÁT TRIỂN XÂY DỰNG', idNumber: '0312283473' },
                { displayName: 'CÔNG TY TNHH CÔNG NGHIỆP', idNumber: '0312283473' },
                { displayName: 'Công ty TNHH Cửa Hàng Tiện Lợi Gia Đình Việt Nam', idNumber: 'YHFTR56' },
                { displayName: 'Ngân Hàng TMCP Á Châu', idNumber: '0312112125' },
                { displayName: 'Công Ty Cổ Phần Dự Kim', idNumber: '' },
              ],
            },
          ],
        ],
        [
          `(*) Nhóm HS:
          - * Nhom HS:Thanh lý HĐ thuê mượn; So CC:009946; Phong CC: VPCC Phú Mỹ Hưng; CC vien:Trịnh Thị Thanh Hương; Ngay cap so: 23/11/2019
        (*) Tài sản:
          - Loai:Đất có tài sản So cn:CS11464 So thua:517 So to:20 Dia chi:120 Đường số 2, Khu phố Hưng Gia V, phường Tân Phong, Quận 7, thành phố Hồ Chí Minh,Phường Tân Phong,Quận 7,TP. Hồ Chí Minh
          - Loai:Đất có tài sản So cn:CS11463 So thua:517 So to:20 Dia chi:120 Đường số 2, Khu phố Hưng Gia V, phường Tân Phong, Quận 7, thành phố Hồ Chí Minh,Phường Tân Phong,Quận 7,TP. Hồ Chí Minh
          - Loai:Đất có tài sản So cn:CS11462 So thua:520 So to:20 Dia chi:122 Đường số 2, Khu phố Hưng Gia V, phường Tân Phong, Quận 7, thành phố Hồ Chí Minh,Phường Tân Phong,Quận 7,TP. Hồ Chí Minh
          - Loai:Đất có tài sản So cn:CS11461 So thua:520 So to:20 Dia chi:122,Phường Tân Phong,Quận 7,TP. Hồ Chí Minh
          - Loai:Đất có tài sản So cn:CS11466 So thua:1048 So to:20 Dia chi:124 Đường số 2, Khu phố Hưng Gia V, phường Tân Phong, Quận 7, thành phố Hồ Chí Minh,Phường Tân Phong,Quận 7,TP. Hồ Chí Minh
          - Loai:Đất có tài sản So cn:CS11465 So thua:1048 So to:20 Dia chi:124 Đường số 2, Khu phố Hưng Gia V, phường Tân Phong, Quận 7, thành phố Hồ Chí Minh,Phường Tân Phong,Quận 7,TP. Hồ Chí Minh
        (*) Đương sự:
          - Ben:Bên cho thuê/ mượn; Vai tro:Bên cho thuê/ mượn (Bên A); LỤC MINH TRANG, So CMT,HC:024042351, Ngay sinh:00/00/1987
          - Ben:Bên cho thuê/ mượn; Vai tro:Bên cho thuê/ mượn (Bên A); NGUYỄN HỒNG HẢI, So CMT,HC:001161010062, Ngay sinh:00/00/1961
          - Ben:Bên thuê/ mượn; Vai tro:Bên thuê/mượn (Bên B); NGUYỄN THỊ HƯƠNG, So CMT,HC:272586094, Ngay sinh:00/00/1995 Thị trấn Tân Túc,Huyện Bình Chánh,TP. Hồ Chí Minh`,
          [
            {
              addresses: [
                '120 Đường số 2, Khu phố Hưng Gia V, phường Tân Phong, Quận 7, thành phố Hồ Chí Minh,Phường Tân Phong,Quận 7,TP. Hồ Chí Minh',
                '120 Đường số 2, Khu phố Hưng Gia V, phường Tân Phong, Quận 7, thành phố Hồ Chí Minh,Phường Tân Phong,Quận 7,TP. Hồ Chí Minh',
                '122 Đường số 2, Khu phố Hưng Gia V, phường Tân Phong, Quận 7, thành phố Hồ Chí Minh,Phường Tân Phong,Quận 7,TP. Hồ Chí Minh',
                '122,Phường Tân Phong,Quận 7,TP. Hồ Chí Minh',
                '124 Đường số 2, Khu phố Hưng Gia V, phường Tân Phong, Quận 7, thành phố Hồ Chí Minh,Phường Tân Phong,Quận 7,TP. Hồ Chí Minh',
                '124 Đường số 2, Khu phố Hưng Gia V, phường Tân Phong, Quận 7, thành phố Hồ Chí Minh,Phường Tân Phong,Quận 7,TP. Hồ Chí Minh',
              ],
              users: [
                {
                  displayName: 'LỤC MINH TRANG',
                  idNumber: '024042351',
                },
                {
                  displayName: 'NGUYỄN HỒNG HẢI',
                  idNumber: '001161010062',
                },
                {
                  displayName: 'NGUYỄN THỊ HƯƠNG',
                  idNumber: '272586094',
                },
              ],
            },
          ],
        ],
        [
          `(*) Nhóm HS:
          - * Nhom HS:Thế chấp; So CC:017321; Phong CC: VPCC Hoàng Xuân Ngụ (Tên cũ: Hoàng Xuân); CC vien:Nguyễn Thị Thúy Ân; Ngay cap so: 30/05/2022
        (*) Tài sản:
          - Loai:Đất có tài sản So vao so:CS11056 So thua:53 So to:20 Dia chi:47 Lê Văn Thiêm, Hưng Phước III (Dia chi cu:lô R4-03 ),Phường Tân Phong,Quận 7,TP. Hồ Chí Minh
          - Loai:Đất có tài sản So seri:AP044806 So vao so:00216QSDĐ So thua:1415-20 So to:06 xã Tân Quy ĐÔng - H.Nhà Bè Dia chi:51 Lê Văn Thiêm, Hưng Phước III,Phường Tân Phong,Quận 7,TP. Hồ Chí Minh
          - Loai:Đất có tài sản So seri:AP044905 So vao so:00140QSDĐ So thua:1415-21 So to:06 xã Tân Quy Đông - H.Nhà Bè Dia chi:49 Lê Văn Thiêm, Hưng Phước III,Phường Tân Phong,Quận 7,TP. Hồ Chí Minh
          - Loai:Đất không có tài sản, So cn:CH05909 So thua:462 So to:20 ,Dia chi:Phường Tân Phong,Quận 7,TP. Hồ Chí Minh
          - Loai:Đất không có tài sản So seri:BC591443 So vao so:CH05909 So thua:462 So to:20,Dia chi:Phường Tân Phong,Quận 7,TP. Hồ Chí Minh
        (*) Đương sự:
          - Ben:Bên thế chấp; Vai tro:Bên thế chấp (Bên A); Đỗ Đức Hồng, So CMT,HC:001052006570, Ngay sinh:00/00/1952, Dia chi: 220 Lô H7, Khu phố Mỹ Hưng, Khu A Phường Tân Phong,Quận 7,TP. Hồ Chí Minh
          - Ben:Bên thế chấp; Vai tro:Bên thế chấp (Bên A); Trần Bích Phương, So CMT,HC:020155000022, Ngay sinh:00/00/1955, Dia chi: 220 Lô H7, khu phố Mỹ Hưng, Khu A Phường Tân Phong,Quận 7,TP. Hồ Chí Minh
          - Ben:Bên nhận thế chấp; Vai tro:Bên nhận thế chấp (Bên B); Ngân hàng TMCP Ngoại Thương Việt Nam - Chi nhánh Vũng Tàu; Ma thue:k; Dia chi:27 Trần Hưng Đạo,Phường 1,Thành phố Vũng Tàu,Tỉnh Bà Rịa - Vũng Tàu
          - Ben:Bên nhận thế chấp; Vai tro:Đại diện; Đoàn Văn Tuyến, So CMT,HC:036066005011, Ngay sinh:00/00/1966`,
          [
            {
              addresses: [
                '47 Lê Văn Thiêm, Hưng Phước III (Dia chi cu:lô R4-03 ),Phường Tân Phong,Quận 7,TP. Hồ Chí Minh',
                '51 Lê Văn Thiêm, Hưng Phước III,Phường Tân Phong,Quận 7,TP. Hồ Chí Minh',
                '49 Lê Văn Thiêm, Hưng Phước III,Phường Tân Phong,Quận 7,TP. Hồ Chí Minh',
                'Phường Tân Phong,Quận 7,TP. Hồ Chí Minh',
                'Phường Tân Phong,Quận 7,TP. Hồ Chí Minh',
              ],
              users: [
                {
                  displayName: 'Đỗ Đức Hồng',
                  idNumber: '001052006570',
                },
                {
                  displayName: 'Trần Bích Phương',
                  idNumber: '020155000022',
                },
                {
                  displayName: 'Ngân hàng TMCP Ngoại Thương Việt Nam - Chi nhánh Vũng Tàu',
                  idNumber: 'k',
                },
                {
                  displayName: 'Đoàn Văn Tuyến',
                  idNumber: '036066005011',
                },
              ],
            },
          ],
        ],
      ])(`should return correct premise detail`, (content, expected) => {
        const details = extractPremiseDetail(content);

        expect(details.length).toEqual(expected.length);
        for (let i = 0; i < details.length; i++) {
          expect(details[i].addresses.length).toEqual(expected[i].addresses.length);
          expect(matchSubstring(details[i].address, expected[i].addresses[0])).toEqual(expected[i].addresses[0]);
          for (let j = 0; j < details[i].addresses.length; j++) {
            const resultAddress = details[i].addresses[j];
            expect(matchSubstring(resultAddress, expected[i].addresses[j])).toEqual(expected[i].addresses[j]);
          }
          // expect(matchSubstring(details[i].address, expected[i].address)).toEqual(expected[i].address);
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
