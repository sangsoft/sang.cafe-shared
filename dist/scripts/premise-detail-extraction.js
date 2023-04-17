// Sections
// https://regex101.com/r/pqPsL1/3
// Address
// https://regex101.com/r/3BFsJf/1
// Users
// https://regex101.com/r/p8s3X8/1
const regex = /(\(\*\) Tài sản:\s*(- Loai:.*))\s*((\(\*\) Đương sự:\s*)(- Ben:.*\s*)+)/gm;
const content = `(*) Nhóm HS:
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
          - Ben:Bên thuê/ mượn; Vai tro:Bên thuê/mượn (Bên B); thiều quang cường, So CMT,HC:025727667, Ngay sinh:00/00/1979 Thị trấn Tân Túc,Huyện Bình Chánh,TP. Hồ Chí Minh
        (*) Tài sản:
          - Loai:Đất có tài sản, So cn:CH00165 So thua:32 So to:3, So nha:19 Phan Đăng Lưu,Phường 03,Quận Bình Thạnh,TP. Hồ Chí Minh
        (*) Đương sự:
          - Ben:Bên cho thuê/ mượn; Vai tro:Bên cho thuê/ mượn (Bên A); Vũ Thành Công, So CMT,HC:023032455, Ngay sinh:00/00/1959
          - Ben:Bên cho thuê/ mượn; Vai tro:Bên cho thuê/ mượn (Bên A); Nguyễn Thị Loan; So CMT,HC:023038351; Ngay sinh:00/00/1972
          - Ben:Bên thuê/ mượn; Vai tro:Bên thuê/mượn (Bên B); thiều quang cường, So CMT,HC:025727667, Ngay sinh:00/00/1979 Thị trấn Tân Túc,Huyện Bình Chánh,TP. Hồ Chí Minh
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
          - Ben:Bên thuê/ mượn; Vai tro:Bên thuê/mượn (Bên B); thiều quang cường, So CMT,HC:025727667, Ngay sinh:00/00/1979 Thị trấn Tân Túc,Huyện Bình Chánh,TP. Hồ Chí Minh
        (*) Tài sản:
          - Loai:Đất có tài sản, So cn:CH00165 So thua:32 So to:3, So nha:19 Phan Đăng Lưu,Phường 03,Quận Bình Thạnh,TP. Hồ Chí Minh
        (*) Đương sự:
          - Ben:Bên cho thuê/ mượn; Vai tro:Bên cho thuê/ mượn (Bên A); Vũ Thành Công, So CMT,HC:023032455, Ngay sinh:00/00/1959
          - Ben:Bên cho thuê/ mượn; Vai tro:Bên cho thuê/ mượn (Bên A); Nguyễn Thị Loan; So CMT,HC:023038351; Ngay sinh:00/00/1972
          - Ben:Bên thuê/ mượn; Vai tro:Bên thuê/mượn (Bên B); thiều quang cường, So CMT,HC:025727667, Ngay sinh:00/00/1979 Thị trấn Tân Túc,Huyện Bình Chánh,TP. Hồ Chí Minh`;
const match = [...content.matchAll(regex)];
let index = 0;
// console.log(match);
// for (const m of match) {
//   console.log(count, '=>', m.index);
//   count++;
// }
const singleMatch = match[index];
let count = 0;
for (const m of singleMatch) {
    console.log(count, '=>', m.trim());
    count++;
}
//# sourceMappingURL=premise-detail-extraction.js.map