const Home = () => {
  return (
    <div className="m-auto p-3 bg-primary-subtle rounded-3 border border-1 border-primary" style={{maxWidth:'650px',minWidth:'550px'}}>
      <div className="d-flex m-2 align-items-center">
        <div>
          <img
            src="./Picture/human.jpg"
            alt="Com"
            style={{
              minHeight: "100px",
              minWidth: "50px",
              maxHeight: "250px",
              maxWidth: "150px",
            }}
          />
        </div>
        <div className="mx-3">
          <p>
            67163266 <br />
            นายสิรภพ อ่วมแก้ว <br />
            มหาวิทยาลัย ศรีปทุม <br />
            ชั้นปีที่ 2 สาขา CSI <br />
            คณะ เทคโนโลยีสาระสนเทศ <br />
          </p>
        </div>
      </div>
      <div className="mx-2">
        สวัสดีครับชื่อเล่น คอม ชอบกินข้าวผัด และฟังเพลง
        ชอบนั่งเล่นพูดไปเรื่อย คิดอะไรไปเรื่อย 
        บ้างทีก็ทำอะไรโดยไม่รู้ตัว
        ชอบเล่น league of legend ครับ เสียสติดี
        kfc อร่อยมากครับ <br />แต่ไก่ย่างวิเชียรบุรีอร่อยกว่า 
      </div>
    </div>
  );
};

export default Home;
