import React from 'react';
import './AboutPage.css';
import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/Navbar/Navbar';

const AboutUs = () => {
  return (
    <div>
      <Navbar />
      <section className="about-us-header" >
        <h2>GIỚI THIỆU </h2>
        <p className="header__content">"Tập luyện không chỉ là về cơ bắp hay số cân bạn nâng được, mà còn là về hành trình nâng cao sức khỏe thể chất và tinh thần. Sản phẩm web của chúng tôi được thiết kế để đồng hành cùng bạn trong từng bước của hành trình này. Với các chương trình luyện tập cá nhân hóa, theo dõi tiến độ chi tiết, và cộng đồng hỗ trợ sôi động, chúng tôi giúp bạn không chỉ đạt được mục tiêu mà còn duy trì động lực mỗi ngày. Dù bạn là người mới bắt đầu hay đã có kinh nghiệm, hãy để chúng tôi giúp bạn chinh phục đỉnh cao sức khỏe và thể hình."

</p>
      </section>

      <div className="new-container">
        <section className="about-us-section">
          <div className="about-section-content">
            <div className="about-image" style={{marginRight: '40px'}}>
              <img src="/img1.jpg" alt="Our Story" />
            </div>
            <div className="about-text" >
              <h3 style={{marginLeft: '40px'}}>CHÚNG TÔI LÀ AI </h3>
              <p className="about-text" style={{marginLeft: '40px'}}>Chúng tôi là ai? SmartFit được thành lập với sứ mệnh mang đến sự dễ dàng tiếp cận và khả năng thay đổi tích cực từ việc tập luyện thể thao cho mọi người. Từ một niềm đam mê giúp mọi người đạt được mục tiêu sức khỏe của mình, chúng tôi đã phát triển thành một cộng đồng năng động, nơi các kỹ thuật tập luyện tiên tiến và chương trình huấn luyện cá nhân hóa kết hợp hoàn hảo. Chúng tôi cam kết xây dựng một môi trường hòa nhập, nơi mỗi thành viên đều cảm thấy được khích lệ để trở thành phiên bản tốt nhất của chính mình, dù là qua luyện tập sức mạnh, cardio hay yoga. Tại SmartFit, chúng tôi không chỉ là một trung tâm thể hình—chúng tôi là một gia đình luôn tận tâm với sự phát triển và sức khỏe của bạn.
              </p>
            </div>
          </div>
        </section>

        <section className="about-us-section reverse">
          <div className="about-section-content">
            <div className="about-text">
              <h3 style={{marginRight: '40px'}}>TẦM NHÌN </h3>
              <p className="about-text" style={{marginRight: '40px'}}>Tại SmartFit, tầm nhìn của chúng tôi là tạo ra một cộng đồng phát triển mạnh mẽ, nơi việc rèn luyện thể chất không chỉ là một mục tiêu mà còn trở thành lối sống. Chúng tôi tin rằng mọi người, dù bắt đầu từ bất kỳ điểm xuất phát nào, đều xứng đáng có cơ hội để sống khỏe mạnh hơn, mạnh mẽ hơn và cân bằng hơn. Bằng cách kết hợp các phương pháp tập luyện tiên tiến với những thực hành chăm sóc sức khỏe toàn diện, chúng tôi mong muốn truyền cảm hứng và trao quyền để mỗi cá nhân tự tin bước vào hành trình thể chất của riêng mình. Mục tiêu của chúng tôi là xây dựng một không gian hòa nhập, nơi mọi người có thể kết nối, phát triển và thay đổi cùng nhau, nuôi dưỡng cả sức mạnh thể chất lẫn sự kiên cường tinh thần.
</p>
            </div>
            <div className="about-image" style={{marginLeft: '40px'}}>
              <img src="/img2.jpg" alt="Our Vision" />
            </div>
          </div>
        </section>

        <section className="about-us-section">
          <div className="about-section-content">
            <div className="about-image" style={{marginRight: '40px'}}>
              <img src="/img3.jpg" alt="Our Mission" />
            </div>
            <div className="about-text">
              <h3 style={{marginLeft: '40px'}}>SỨ MỆNH</h3>
              <p className="about-text" style={{marginLeft: '40px'}}>Sứ mệnh của SmartFit là mang đến các giải pháp tập luyện cá nhân hóa và sáng tạo, phù hợp với mọi cấp độ thể chất. Chúng tôi tận tâm kết hợp tinh hoa của tập luyện sức mạnh, sức khỏe tim mạch và yoga để cung cấp một phương pháp toàn diện hướng đến sức khỏe. Với trọng tâm là xây dựng thói quen bền vững, chúng tôi luôn hỗ trợ từng thành viên đạt được mục tiêu riêng của họ—dù đó là cải thiện thể lực, tăng cường sự tỉnh thức hay nâng cao sức khỏe tổng thể. Tại SmartFit, chúng tôi cam kết mang đến những công cụ, sự hướng dẫn và cộng đồng cần thiết để bạn đạt được thành công lâu dài cả về thể chất lẫn tinh thần.</p>
            </div>
          </div>
        </section>
      </div>
      <Footer /> 
    </div>
  );
};

export default AboutUs;
