// Food Recipe Data với hướng dẫn nấu nướng chi tiết
const foodRecipeData = {
    'banh-chung': {
        title: "🥮 Bánh Chưng - Miền Bắc",
        region: "Miền Bắc",
        content: `
            <div class="recipe-header">
                <h4>🍽️ Nguyên liệu (cho 10 cái bánh):</h4>
                <ul>
                    <li><strong>Gạo nếp:</strong> 1kg (ngâm 4-6 tiếng)</li>
                    <li><strong>Thịt lợn ba chỉ:</strong> 500g (cắt miếng vừa)</li>
                    <li><strong>Đậu xanh cà:</strong> 300g (ngâm qua đêm, bóc vỏ)</li>
                    <li><strong>Lá dong:</strong> 40-50 lá (rửa sạch, phơi khô)</li>
                    <li><strong>Lạt tre:</strong> 20 sợi (luộc mềm)</li>
                    <li><strong>Gia vị:</strong> Muối, tiêu, nước mắm, hành khô</li>
                </ul>
            </div>
            
            <div class="recipe-steps">
                <h4>👨‍🍳 Cách làm:</h4>
                <ol>
                    <li><strong>Chuẩn bị nguyên liệu:</strong>
                        <ul>
                            <li>Gạo nếp ngâm nước muối 4-6 tiếng</li>
                            <li>Đậu xanh ngâm qua đêm, bóc vỏ, nấu chín, nghiền nhuyễn</li>
                            <li>Thịt ướp với muối, tiêu, nước mắm, hành khô băm</li>
                        </ul>
                    </li>
                    <li><strong>Gói bánh:</strong>
                        <ul>
                            <li>Trải 2 lá dong thành hình vuông</li>
                            <li>Cho 1 lớp gạo nếp, 1 lớp đậu xanh, thịt, rồi đậu xanh và gạo nếp</li>
                            <li>Gói chặt thành hình vuông, buộc bằng lạt tre</li>
                        </ul>
                    </li>
                    <li><strong>Nấu bánh:</strong>
                        <ul>
                            <li>Cho bánh vào nồi, đổ nước ngập bánh</li>
                            <li>Nấu 10-12 tiếng với lửa vừa</li>
                            <li>Thường xuyên thêm nước sôi để bánh luôn ngập nước</li>
                        </ul>
                    </li>
                </ol>
            </div>
            
            <div class="recipe-tips">
                <h4>💡 Mẹo hay:</h4>
                <ul>
                    <li>Chọn gạo nếp dẻo, hạt đều</li>
                    <li>Lá dong phải tươi, không rách</li>
                    <li>Gói bánh phải chặt để không bị tung khi nấu</li>
                    <li>Nấu lửa đều, không để cạn nước</li>
                </ul>
            </div>
        `
    },
    'banh-tet': {
        title: "🍘 Bánh Tét - Miền Nam",
        region: "Miền Nam",
        content: `
            <div class="recipe-header">
                <h4>🍽️ Nguyên liệu (cho 10 cái bánh):</h4>
                <ul>
                    <li><strong>Gạo nếp:</strong> 1kg (ngâm 4-6 tiếng)</li>
                    <li><strong>Thịt lợn ba chỉ:</strong> 500g</li>
                    <li><strong>Đậu xanh cà:</strong> 300g</li>
                    <li><strong>Lá chuối:</strong> 20 lá (rửa sạch, cắt bỏ gân)</li>
                    <li><strong>Dây lạt:</strong> 20 sợi</li>
                    <li><strong>Gia vị:</strong> Muối, tiêu, nước mắm</li>
                </ul>
            </div>
            
            <div class="recipe-steps">
                <h4>👨‍🍳 Cách làm:</h4>
                <ol>
                    <li><strong>Chuẩn bị:</strong>
                        <ul>
                            <li>Gạo nếp ngâm nước muối</li>
                            <li>Đậu xanh nấu chín, nghiền nhuyễn, nêm gia vị</li>
                            <li>Thịt luộc chín, cắt miếng dài</li>
                            <li>Lá chuối rửa sạch, thái bỏ gân</li>
                        </ul>
                    </li>
                    <li><strong>Gói bánh:</strong>
                        <ul>
                            <li>Trải lá chuối, cho gạo nếp lên</li>
                            <li>Đặt nhân đậu xanh và thịt ở giữa</li>
                            <li>Cuốn tròn, buộc chặt hai đầu</li>
                        </ul>
                    </li>
                    <li><strong>Nấu bánh:</strong>
                        <ul>
                            <li>Xếp bánh vào nồi, đổ nước ngập</li>
                            <li>Nấu 8-10 tiếng với lửa nhỏ</li>
                            <li>Thỉnh thoảng thêm nước sôi</li>
                        </ul>
                    </li>
                </ol>
            </div>
            
            <div class="recipe-tips">
                <h4>💡 Mẹo hay:</h4>
                <ul>
                    <li>Lá chuối non sẽ dẻo và thơm hơn</li>
                    <li>Cuốn bánh không quá chặt để gạo nở đều</li>
                    <li>Nấu lửa nhỏ để bánh chín đều</li>
                </ul>
            </div>
        `
    },
    'thit-kho-tau': {
        title: "🍖 Thịt Kho Tàu",
        region: "Cả nước",
        content: `
            <div class="recipe-header">
                <h4>🍽️ Nguyên liệu (4-6 người ăn):</h4>
                <ul>
                    <li><strong>Thịt ba chỉ:</strong> 800g (cắt miếng vừa)</li>
                    <li><strong>Trứng gà:</strong> 10 quả (luộc chín, bóc vỏ)</li>
                    <li><strong>Nước dừa tươi:</strong> 500ml</li>
                    <li><strong>Đường phèn:</strong> 3 thìa canh</li>
                    <li><strong>Nước mắm:</strong> 4 thìa canh</li>
                    <li><strong>Hành tím:</strong> 3 củ (băm nhỏ)</li>
                    <li><strong>Tiêu, muối</strong> vừa đủ</li>
                </ul>
            </div>
            
            <div class="recipe-steps">
                <h4>👨‍🍳 Cách làm:</h4>
                <ol>
                    <li><strong>Chuẩn bị thịt:</strong>
                        <ul>
                            <li>Thịt rửa sạch, cắt miếng vừa ăn</li>
                            <li>Ướp với muối, tiêu, hành băm 30 phút</li>
                        </ul>
                    </li>
                    <li><strong>Làm nước màu:</strong>
                        <ul>
                            <li>Đun chảo với lửa nhỏ</li>
                            <li>Cho đường phèn vào, khuấy đều đến khi có màu nâu đỏ</li>
                            <li>Thêm 2 thìa nước, khuấy đều</li>
                        </ul>
                    </li>
                    <li><strong>Kho thịt:</strong>
                        <ul>
                            <li>Cho thịt vào chảo nước màu, đảo đều</li>
                            <li>Thêm nước dừa, nước mắm</li>
                            <li>Đun sôi rồi hạ lửa nhỏ, kho 1.5 tiếng</li>
                            <li>Cho trứng vào, kho thêm 30 phút</li>
                        </ul>
                    </li>
                </ol>
            </div>
            
            <div class="recipe-tips">
                <h4>💡 Mẹo hay:</h4>
                <ul>
                    <li>Nước màu phải có màu nâu đỏ đẹp</li>
                    <li>Kho lửa nhỏ để thịt mềm, nước sốt đặc</li>
                    <li>Nêm nếm vị trong quá trình kho</li>
                </ul>
            </div>
        `
    },
    'nem-ran': {
        title: "🥟 Nem Rán",
        region: "Miền Bắc",
        content: `
            <div class="recipe-header">
                <h4>🍽️ Nguyên liệu (30 cái nem):</h4>
                <ul>
                    <li><strong>Thịt lợn xay:</strong> 300g</li>
                    <li><strong>Tôm tươi:</strong> 200g (bóc vỏ, băm nhỏ)</li>
                    <li><strong>Miến:</strong> 50g (ngâm mềm, cắt ngắn)</li>
                    <li><strong>Nấm mèo:</strong> 30g (ngâm mềm, thái nhỏ)</li>
                    <li><strong>Cà rốt:</strong> 1 củ (thái sợi)</li>
                    <li><strong>Bánh tráng:</strong> 30 tờ</li>
                    <li><strong>Gia vị:</strong> Muối, tiêu, nước mắm, đường</li>
                </ul>
            </div>
            
            <div class="recipe-steps">
                <h4>👨‍🍳 Cách làm:</h4>
                <ol>
                    <li><strong>Làm nhân:</strong>
                        <ul>
                            <li>Trộn thịt, tôm, miến, nấm, cà rốt</li>
                            <li>Nêm muối, tiêu, nước mắm, đường</li>
                            <li>Trộn đều, ướp 15 phút</li>
                        </ul>
                    </li>
                    <li><strong>Gói nem:</strong>
                        <ul>
                            <li>Bánh tráng qua nước ấm cho mềm</li>
                            <li>Cho nhân vào, gói chặt thành hình trụ</li>
                            <li>Dùng lòng trắng trứng để dính miệng bánh</li>
                        </ul>
                    </li>
                    <li><strong>Chiên nem:</strong>
                        <ul>
                            <li>Đun dầu 170°C</li>
                            <li>Cho nem vào chiên vàng đều</li>
                            <li>Vớt ra để ráo dầu</li>
                        </ul>
                    </li>
                </ol>
            </div>
            
            <div class="recipe-tips">
                <h4>💡 Mẹo hay:</h4>
                <ul>
                    <li>Bánh tráng không quá ướt khi gói</li>
                    <li>Gói nem chặt để không bị tung khi chiên</li>
                    <li>Dầu phải đủ nóng mới chiên giòn</li>
                    <li>Ăn kèm bún, rau sống và nước chấm</li>
                </ul>
            </div>
        `
    },
    'xoi-gac': {
        title: "🍚 Xôi Gấc",
        region: "Cả nước",
        content: `
            <div class="recipe-header">
                <h4>🍽️ Nguyên liệu (6-8 người ăn):</h4>
                <ul>
                    <li><strong>Gạo nếp:</strong> 500g (ngâm 4-6 tiếng)</li>
                    <li><strong>Quả gấc:</strong> 1/2 quả (khoảng 200g)</li>
                    <li><strong>Dừa nạo:</strong> 100g</li>
                    <li><strong>Đậu xanh rang:</strong> 50g</li>
                    <li><strong>Muối:</strong> 1 thìa cà phê</li>
                    <li><strong>Đường:</strong> 2 thìa canh</li>
                </ul>
            </div>
            
            <div class="recipe-steps">
                <h4>👨‍🍳 Cách làm:</h4>
                <ol>
                    <li><strong>Chuẩn bị gấc:</strong>
                        <ul>
                            <li>Gấc cạo lấy phần cùi đỏ</li>
                            <li>Trộn với 2 thìa nước ấm, vắt lấy nước màu</li>
                            <li>Lọc bỏ xác để lấy nước trong</li>
                        </ul>
                    </li>
                    <li><strong>Nấu xôi:</strong>
                        <ul>
                            <li>Gạo nếp vo sạch, để ráo</li>
                            <li>Trộn gạo với nước gấc, muối</li>
                            <li>Cho vào nồi cơm điện hoặc hấp 25-30 phút</li>
                        </ul>
                    </li>
                    <li><strong>Hoàn thiện:</strong>
                        <ul>
                            <li>Xôi chín rắc dừa nạo lên trên</li>
                            <li>Trang trí với đậu xanh rang</li>
                            <li>Ăn nóng khi còn thơm</li>
                        </ul>
                    </li>
                </ol>
            </div>
            
            <div class="recipe-tips">
                <h4>💡 Mẹo hay:</h4>
                <ul>
                    <li>Chọn gấc chín đỏ, cùi dày</li>
                    <li>Không cho quá nhiều nước gấc sẽ bị nhão</li>
                    <li>Hấp xôi bằng nồi hấp sẽ dẻo hơn</li>
                </ul>
            </div>
        `
    },
    'ga-luoc': {
        title: "🐔 Gà Luộc",
        region: "Cả nước",
        content: `
            <div class="recipe-header">
                <h4>🍽️ Nguyên liệu:</h4>
                <ul>
                    <li><strong>Gà ta:</strong> 1 con (1.2-1.5kg)</li>
                    <li><strong>Gừng:</strong> 50g (đập dập)</li>
                    <li><strong>Hành lá:</strong> 3 cây</li>
                    <li><strong>Muối:</strong> 2 thìa canh</li>
                    <li><strong>Rượu trắng:</strong> 2 thìa canh</li>
                    <li><strong>Nước mắm, chanh, tiêu</strong> để chấm</li>
                </ul>
            </div>
            
            <div class="recipe-steps">
                <h4>👨‍🍳 Cách làm:</h4>
                <ol>
                    <li><strong>Sơ chế gà:</strong>
                        <ul>
                            <li>Gà rửa sạch, chà muối khắp thân</li>
                            <li>Nhồi gừng và hành vào bụng gà</li>
                            <li>Ướp rượu trắng 15 phút</li>
                        </ul>
                    </li>
                    <li><strong>Luộc gà:</strong>
                        <ul>
                            <li>Đun sôi nồi nước với gừng, hành</li>
                            <li>Cho gà vào, đun sôi rồi hạ lửa nhỏ</li>
                            <li>Luộc 25-30 phút (tùy size gà)</li>
                            <li>Tắt bếp, ngâm gà trong nước 10 phút</li>
                        </ul>
                    </li>
                    <li><strong>Hoàn thiện:</strong>
                        <ul>
                            <li>Vớt gà ra, để nguội</li>
                            <li>Chà dầu ăn lên da để bóng đẹp</li>
                            <li>Cắt miếng vừa ăn, bày đĩa</li>
                        </ul>
                    </li>
                </ol>
            </div>
            
            <div class="recipe-tips">
                <h4>💡 Mẹo hay:</h4>
                <ul>
                    <li>Chọn gà ta để thịt ngọt, thơm</li>
                    <li>Luộc lửa nhỏ để thịt không bị dai</li>
                    <li>Ngâm trong nước sau khi tắt bếp để thịt mềm</li>
                    <li>Ăn kèm muối tiêu chanh hoặc gừng</li>
                </ul>
            </div>
        `
    },
    'canh-kho-qua': {
        title: "🥒 Canh Khổ Qua Nhồi Thịt",
        region: "Cả nước",
        content: `
            <div class="recipe-header">
                <h4>🍽️ Nguyên liệu (4 người ăn):</h4>
                <ul>
                    <li><strong>Khổ qua:</strong> 2 quả (to, xanh)</li>
                    <li><strong>Thịt lợn xay:</strong> 200g</li>
                    <li><strong>Tôm khô:</strong> 20g (ngâm mềm)</li>
                    <li><strong>Hành tím:</strong> 2 củ (băm nhỏ)</li>
                    <li><strong>Miến:</strong> 30g (ngâm mềm, cắt ngắn)</li>
                    <li><strong>Gia vị:</strong> Muối, tiêu, nước mắm, dầu ăn</li>
                </ul>
            </div>
            
            <div class="recipe-steps">
                <h4>👨‍🍳 Cách làm:</h4>
                <ol>
                    <li><strong>Chuẩn bị khổ qua:</strong>
                        <ul>
                            <li>Khổ qua cắt khúc 3-4cm</li>
                            <li>Dùng thìa khoét bỏ ruột và hạt</li>
                            <li>Chà muối, rửa sạch để bớt đắng</li>
                        </ul>
                    </li>
                    <li><strong>Làm nhân:</strong>
                        <ul>
                            <li>Thịt xay trộn với tôm khô băm, hành băm</li>
                            <li>Thêm miến, nêm gia vị</li>
                            <li>Trộn đều, nhồi vào khổ qua</li>
                        </ul>
                    </li>
                    <li><strong>Nấu canh:</strong>
                        <ul>
                            <li>Đun sôi 1 lít nước</li>
                            <li>Cho khổ qua nhồi thịt vào</li>
                            <li>Nấu 15-20 phút đến khi chín</li>
                            <li>Nêm nếm vị vừa ăn</li>
                        </ul>
                    </li>
                </ol>
            </div>
            
            <div class="recipe-tips">
                <h4>💡 Mẹo hay:</h4>
                <ul>
                    <li>Chọn khổ qua xanh, không quá già</li>
                    <li>Chà muối để bớt đắng</li>
                    <li>Nhồi thịt vừa đủ, không quá chặt</li>
                    <li>Nấu vừa tới để khổ qua không bị nát</li>
                </ul>
            </div>
        `
    },
    'mang-kho-thit': {
        title: "🥬 Măng Khô Kho Thịt",
        region: "Cả nước",
        content: `
            <div class="recipe-header">
                <h4>🍽️ Nguyên liệu (4-6 người ăn):</h4>
                <ul>
                    <li><strong>Măng khô:</strong> 200g (ngâm mềm)</li>
                    <li><strong>Thịt ba chỉ:</strong> 500g (cắt miếng)</li>
                    <li><strong>Nước dừa:</strong> 300ml</li>
                    <li><strong>Hành tím:</strong> 3 củ (băm nhỏ)</li>
                    <li><strong>Tỏi:</strong> 3 tép (băm nhỏ)</li>
                    <li><strong>Gia vị:</strong> Nước mắm, đường, tiêu, dầu ăn</li>
                </ul>
            </div>
            
            <div class="recipe-steps">
                <h4>👨‍🍳 Cách làm:</h4>
                <ol>
                    <li><strong>Chuẩn bị măng:</strong>
                        <ul>
                            <li>Măng khô ngâm nước ấm 2-3 tiếng</li>
                            <li>Rửa sạch, vắt khô, cắt khúc vừa</li>
                            <li>Luộc qua nước sôi 5 phút</li>
                        </ul>
                    </li>
                    <li><strong>Sơ chế thịt:</strong>
                        <ul>
                            <li>Thịt rửa sạch, cắt miếng vừa ăn</li>
                            <li>Ướp với muối, tiêu, nước mắm</li>
                        </ul>
                    </li>
                    <li><strong>Kho măng thịt:</strong>
                        <ul>
                            <li>Phi thơm hành tỏi</li>
                            <li>Cho thịt vào xào săn</li>
                            <li>Thêm măng, đảo đều</li>
                            <li>Đổ nước dừa, nêm gia vị</li>
                            <li>Kho lửa nhỏ 45 phút đến khi măng mềm</li>
                        </ul>
                    </li>
                </ol>
            </div>
            
            <div class="recipe-tips">
                <h4>💡 Mẹo hay:</h4>
                <ul>
                    <li>Ngâm măng đủ mềm mới kho</li>
                    <li>Luộc qua để bớt mùi hăng</li>
                    <li>Kho lửa nhỏ để măng thấm vị</li>
                    <li>Để qua đêm sẽ ngon hơn</li>
                </ul>
            </div>
        `
    },
    'mut-tet': {
        title: "🍑 Mứt Tết Truyền Thống",
        region: "Cả nước",
        content: `
            <div class="recipe-header">
                <h4>🍽️ Mứt Dừa - Nguyên liệu:</h4>
                <ul>
                    <li><strong>Dừa tươi:</strong> 2 quả (cạo sợi)</li>
                    <li><strong>Đường cát:</strong> 500g</li>
                    <li><strong>Nước:</strong> 200ml</li>
                    <li><strong>Màu thực phẩm:</strong> vài giọt (tùy chọn)</li>
                    <li><strong>Vani:</strong> 1 thìa cà phê</li>
                </ul>
            </div>
            
            <div class="recipe-steps">
                <h4>👨‍🍳 Cách làm mứt dừa:</h4>
                <ol>
                    <li><strong>Chuẩn bị dừa:</strong>
                        <ul>
                            <li>Dừa cạo thành sợi mỏng</li>
                            <li>Rửa sạch, vắt khô</li>
                        </ul>
                    </li>
                    <li><strong>Nấu đường:</strong>
                        <ul>
                            <li>Đun đường với nước thành syrup đặc</li>
                            <li>Thêm màu thực phẩm nếu muốn</li>
                        </ul>
                    </li>
                    <li><strong>Làm mứt:</strong>
                        <ul>
                            <li>Cho dừa vào syrup đường</li>
                            <li>Khuấy đều, nấu lửa nhỏ 20-30 phút</li>
                            <li>Thêm vani, khuấy đều</li>
                            <li>Nấu đến khi dừa trong, bóng</li>
                        </ul>
                    </li>
                </ol>
            </div>
            
            <div class="recipe-variations">
                <h4>🌟 Các loại mứt khác:</h4>
                <ul>
                    <li><strong>Mứt gừng:</strong> Gừng thái lát, ngâm nước vôi, nấu với đường</li>
                    <li><strong>Mứt sen:</strong> Hạt sen tươi nấu với đường phèn</li>
                    <li><strong>Mứt cà rốt:</strong> Cà rốt thái hạt lựu, nấu với đường</li>
                    <li><strong>Mứt bí:</strong> Bí đỏ thái miếng, nấu với đường và gừng</li>
                </ul>
            </div>
            
            <div class="recipe-tips">
                <h4>💡 Mẹo hay:</h4>
                <ul>
                    <li>Nấu lửa nhỏ để không bị cháy</li>
                    <li>Khuấy đều tay để mứt không dính đáy</li>
                    <li>Bảo quản trong hộp kín, nơi khô ráo</li>
                    <li>Mứt ngon khi có độ ngọt vừa phải</li>
                </ul>
            </div>
        `
    },
    'pho-bo': {
        title: "🍜 Phở Bò Hà Nội",
        region: "Miền Bắc",
        content: `
            <div class="recipe-header">
                <h4>🍽️ Nguyên liệu (4 người ăn):</h4>
                <ul>
                    <li><strong>Xương ống bò:</strong> 1kg</li>
                    <li><strong>Thịt bò tái:</strong> 300g (thái mỏng)</li>
                    <li><strong>Bánh phở:</strong> 400g (ngâm mềm)</li>
                    <li><strong>Hành tây:</strong> 1 củ (nướng thơm)</li>
                    <li><strong>Gừng:</strong> 50g (nướng thơm)</li>
                    <li><strong>Gia vị:</strong> Hồi, quế, thảo quả, đinh hương</li>
                    <li><strong>Rau ăn kèm:</strong> Hành lá, ngò gai, giá đỗ</li>
                </ul>
            </div>
            
            <div class="recipe-steps">
                <h4>👨‍🍳 Cách làm:</h4>
                <ol>
                    <li><strong>Nấu nước dùng:</strong>
                        <ul>
                            <li>Xương rửa sạch, chần qua nước sôi</li>
                            <li>Nướng hành, gừng thơm</li>
                            <li>Cho xương, hành, gừng vào nồi</li>
                            <li>Đổ nước, nấu 3-4 tiếng</li>
                            <li>Thêm gia vị, nấu thêm 1 tiếng</li>
                        </ul>
                    </li>
                    <li><strong>Chuẩn bị bánh phở:</strong>
                        <ul>
                            <li>Bánh phở ngâm nước ấm cho mềm</li>
                            <li>Chần qua nước sôi</li>
                            <li>Để ráo, cho vào tô</li>
                        </ul>
                    </li>
                    <li><strong>Hoàn thiện:</strong>
                        <ul>
                            <li>Đặt thịt bò tái lên bánh phở</li>
                            <li>Chan nước dùng nóng</li>
                            <li>Rắc hành lá, ngò gai</li>
                            <li>Ăn kèm giá đỗ, chanh, ớt</li>
                        </ul>
                    </li>
                </ol>
            </div>
            
            <div class="recipe-tips">
                <h4>💡 Mẹo hay:</h4>
                <ul>
                    <li>Nước dùng phải trong, ngọt tự nhiên</li>
                    <li>Nướng hành gừng để nước dùng thơm</li>
                    <li>Thịt bò thái mỏng sẽ chín vừa tới</li>
                    <li>Nước dùng phải đủ nóng để chín thịt</li>
                </ul>
            </div>
        `
    },
    'bun-bo-hue': {
        title: "🌶️ Bún Bò Huế",
        region: "Miền Trung",
        content: `
            <div class="recipe-header">
                <h4>🍽️ Nguyên liệu (4 người ăn):</h4>
                <ul>
                    <li><strong>Xương heo:</strong> 500g</li>
                    <li><strong>Thịt bò:</strong> 300g (thái lát)</li>
                    <li><strong>Chả cua:</strong> 200g</li>
                    <li><strong>Bún tươi:</strong> 400g</li>
                    <li><strong>Sả:</strong> 3 cây (đập dập)</li>
                    <li><strong>Mắm ruốc:</strong> 2 thìa canh</li>
                    <li><strong>Ớt bột:</strong> 2 thìa canh</li>
                    <li><strong>Rau ăn kèm:</strong> Rau muống, giá đỗ, bắp chuối</li>
                </ul>
            </div>
            
            <div class="recipe-steps">
                <h4>👨‍🍳 Cách làm:</h4>
                <ol>
                    <li><strong>Nấu nước dùng:</strong>
                        <ul>
                            <li>Xương heo ninh 2-3 tiếng</li>
                            <li>Thêm sả đập dập</li>
                            <li>Nêm mắm ruốc, muối</li>
                        </ul>
                    </li>
                    <li><strong>Làm nước màu:</strong>
                        <ul>
                            <li>Phi ớt bột với dầu ăn</li>
                            <li>Thêm vào nước dùng</li>
                            <li>Tạo màu đỏ đặc trưng</li>
                        </ul>
                    </li>
                    <li><strong>Hoàn thiện:</strong>
                        <ul>
                            <li>Bún chần qua nước sôi</li>
                            <li>Cho thịt bò, chả cua vào tô</li>
                            <li>Chan nước dùng nóng</li>
                            <li>Ăn kèm rau sống</li>
                        </ul>
                    </li>
                </ol>
            </div>
            
            <div class="recipe-tips">
                <h4>💡 Mẹo hay:</h4>
                <ul>
                    <li>Mắm ruốc tạo vị đặc trưng</li>
                    <li>Ớt bột phi thơm mới cho vào</li>
                    <li>Nước dùng phải có màu đỏ đẹp</li>
                    <li>Ăn kèm nhiều rau sống</li>
                </ul>
            </div>
        `
    },
    'hu-tieu-nam-vang': {
        title: "🍲 Hủ Tiếu Nam Vang",
        region: "Miền Nam",
        content: `
            <div class="recipe-header">
                <h4>🍽️ Nguyên liệu (4 người ăn):</h4>
                <ul>
                    <li><strong>Xương heo:</strong> 500g</li>
                    <li><strong>Tôm khô:</strong> 50g</li>
                    <li><strong>Thịt băm:</strong> 200g</li>
                    <li><strong>Gan heo:</strong> 100g (luộc chín, thái lát)</li>
                    <li><strong>Hủ tiếu khô:</strong> 400g (ngâm mềm)</li>
                    <li><strong>Hành tím:</strong> 3 củ (phi vàng)</li>
                    <li><strong>Rau ăn kèm:</strong> Giá đỗ, hẹ, salad</li>
                </ul>
            </div>
            
            <div class="recipe-steps">
                <h4>👨‍🍳 Cách làm:</h4>
                <ol>
                    <li><strong>Nấu nước dùng:</strong>
                        <ul>
                            <li>Xương heo ninh 2 tiếng</li>
                            <li>Thêm tôm khô rang thơm</li>
                            <li>Nêm nếm vị ngọt thanh</li>
                        </ul>
                    </li>
                    <li><strong>Chuẩn bị topping:</strong>
                        <ul>
                            <li>Thịt băm xào với hành phi</li>
                            <li>Gan heo luộc chín, thái lát</li>
                            <li>Tôm khô rang giòn</li>
                        </ul>
                    </li>
                    <li><strong>Hoàn thiện:</strong>
                        <ul>
                            <li>Hủ tiếu chần qua nước sôi</li>
                            <li>Cho topping lên hủ tiếu</li>
                            <li>Chan nước dùng nóng</li>
                            <li>Rắc hành phi, ăn kèm rau</li>
                        </ul>
                    </li>
                </ol>
            </div>
            
            <div class="recipe-tips">
                <h4>💡 Mẹo hay:</h4>
                <ul>
                    <li>Tôm khô rang thơm tạo vị ngọt</li>
                    <li>Nước dùng trong, ngọt tự nhiên</li>
                    <li>Hành phi giòn tạo hương thơm</li>
                    <li>Ăn kèm tương ớt Sriracha</li>
                </ul>
            </div>
        `
    },
    'banh-khot': {
        title: "🥞 Bánh Khọt Vũng Tàu",
        region: "Miền Nam",
        content: `
            <div class="recipe-header">
                <h4>🍽️ Nguyên liệu (30 cái bánh):</h4>
                <ul>
                    <li><strong>Bột gạo:</strong> 200g</li>
                    <li><strong>Bột năng:</strong> 50g</li>
                    <li><strong>Nước cốt dừa:</strong> 400ml</li>
                    <li><strong>Tôm tươi:</strong> 300g (bóc vỏ)</li>
                    <li><strong>Hành lá:</strong> 3 cây (thái nhỏ)</li>
                    <li><strong>Nghệ bột:</strong> 1 thìa cà phê</li>
                    <li><strong>Muối, đường:</strong> vừa đủ</li>
                    <li><strong>Rau ăn kèm:</strong> Salad, dưa chuột, cà chua</li>
                </ul>
            </div>
            
            <div class="recipe-steps">
                <h4>👨‍🍳 Cách làm:</h4>
                <ol>
                    <li><strong>Pha bột:</strong>
                        <ul>
                            <li>Trộn bột gạo, bột năng</li>
                            <li>Thêm nước cốt dừa từ từ</li>
                            <li>Cho nghệ, muối, đường</li>
                            <li>Khuấy đều, để nghỉ 30 phút</li>
                        </ul>
                    </li>
                    <li><strong>Chuẩn bị chảo:</strong>
                        <ul>
                            <li>Chảo bánh khọt đun nóng</li>
                            <li>Cho dầu vào từng lỗ</li>
                            <li>Đợi dầu nóng</li>
                        </ul>
                    </li>
                    <li><strong>Làm bánh:</strong>
                        <ul>
                            <li>Múc bột vào từng lỗ</li>
                            <li>Cho 1 con tôm vào giữa</li>
                            <li>Rắc hành lá lên trên</li>
                            <li>Đậy nắp, nướng 3-5 phút</li>
                            <li>Lật bánh, nướng mặt kia</li>
                        </ul>
                    </li>
                </ol>
            </div>
            
            <div class="recipe-tips">
                <h4>💡 Mẹo hay:</h4>
                <ul>
                    <li>Bột phải đặc vừa, không quá loãng</li>
                    <li>Dầu phải đủ nóng mới giòn</li>
                    <li>Không lật bánh quá sớm</li>
                    <li>Ăn nóng với nước chấm chua ngọt</li>
                </ul>
            </div>
        `
    }
};

// Hàm mở modal món ăn
function openFoodModal(foodId) {
    const modal = document.getElementById('foodModal');
    const title = document.getElementById('foodModalTitle');
    const content = document.getElementById('foodModalContent');
    
    if (foodRecipeData[foodId]) {
        title.innerHTML = foodRecipeData[foodId].title;
        content.innerHTML = foodRecipeData[foodId].content;
        modal.style.display = 'block';
        
        // Thêm animation cho modal
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
        
        // Ngăn scroll của body
        document.body.style.overflow = 'hidden';
    }
}

// Hàm đóng modal món ăn
function closeFoodModal() {
    const modal = document.getElementById('foodModal');
    
    // Animation đóng modal
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// Đóng modal khi click bên ngoài
window.addEventListener('click', function(event) {
    const modal = document.getElementById('foodModal');
    if (event.target === modal) {
        closeFoodModal();
    }
});

// Đóng modal khi nhấn ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modal = document.getElementById('foodModal');
        if (modal.style.display === 'block') {
            closeFoodModal();
        }
    }
});

// Thêm hiệu ứng hover cho food cards
document.addEventListener('DOMContentLoaded', function() {
    const foodCards = document.querySelectorAll('.food-card');
    
    foodCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});