import { getAllReservation } from '@apis/reservation';
import { useQuery } from '@tanstack/react-query';

// 모든 예약 정보 불러오기
const useGetAllMyReservations = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['myReservationList'],
    queryFn: async () => {
      const reservationList = await getAllReservation();
      const filteredReservation = reservationList.filter(
        (item) => item.state !== 'ON_HOLD' && item.state !== 'PAYMENT_FAIL',
      );

      return filteredReservation;
    },
  });

  return { reservationList: data ?? [], isLoading };
};

export default useGetAllMyReservations;
