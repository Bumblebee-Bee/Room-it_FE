import MainLayout from '@layouts/MainLayout';

const StartPage = () => {
  return (
    <>
      <MainLayout>
        <div className='flex flex-col items-center'>
          <h1 className='w-[330px] text-[24px]'>
            원하는 서비스에 따라 <br />
            사용자 유형을 선택해주세요.
          </h1>
          <div className='mt-[30px] h-[90px] w-[330px] rounded-[10px] bg-primary bg-opacity-[8%] px-[20px] py-[22.5px]'>
            <p className='text-[12px]'>
              스터디룸 예약 서비스를 이용하고 싶으신가요?
            </p>
            <h3 className='text-[18px] font-[600]'>사용자로 이용하기</h3>
          </div>
          <div className='mt-[10px] h-[90px] w-[330px] rounded-[10px] bg-primary bg-opacity-[8%] px-[20px] py-[22.5px]'>
            <p className='text-[12px]'>
              스터디룸을 효율적으로 관리하고 싶으신가요?
            </p>
            <h3 className='text-[18px] font-[600]'>사업자로 이용하기</h3>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default StartPage;
