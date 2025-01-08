import { SyncLoader } from 'react-spinners';
import UserNotiCard from './UserNotiCard';
import useGetUserAlarm from '../hooks/useGetUserAlarm';

const UserNotiList = () => {
  const { data: userAlarmList, isLoading } = useGetUserAlarm();

  const sortedNotification = userAlarmList?.sort((b, a) => {
    return +new Date(a.createdAt) - +new Date(b.createdAt);
  });

  return (
    <>
      {sortedNotification && sortedNotification.length > 0 ? (
        <div className='mt-4 flex w-[375px] flex-col justify-center gap-[13px] pb-24'>
          {sortedNotification.map((item) => {
            return (
              <UserNotiCard
                key={item.memberalrimId}
                item={item}
              />
            );
          })}
        </div>
      ) : (
        <>
          {isLoading ? (
            <div className='flex h-[300px] w-full items-center justify-center'>
              <SyncLoader color='#50BEAD' />
            </div>
          ) : (
            <div className='mt-[47px] w-[375px] text-center text-[14px] font-normal text-subfont'>
              알림이 없습니다.
            </div>
          )}
        </>
      )}
    </>
  );
};

export default UserNotiList;
