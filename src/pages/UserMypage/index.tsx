import HeaderNoTitle from '@layouts/HeaderNoTitle';
import MainLayout from '@layouts/MainLayout';
import BottomNavigation from '@layouts/BottomNavigation';
import TokenRefresher from '@components/TokenRefresher';
import UserButtonContainer from './components/UserButtonContainer';
import UserInfo from './components/UserInfo';

const UserMypage = () => {
  return (
    <>
      <TokenRefresher>
        <MainLayout>
          <HeaderNoTitle />
          <div className='flex h-[263px] w-[375px] flex-col items-center bg-primary'>
            <UserInfo />
            <UserButtonContainer />
          </div>
          <BottomNavigation />
        </MainLayout>
      </TokenRefresher>
    </>
  );
};

export default UserMypage;
