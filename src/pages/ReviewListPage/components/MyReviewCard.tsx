import { MdArrowForwardIos } from 'react-icons/md';
import { FaStar, FaRegStar } from 'react-icons/fa6';
import { getDateFunction } from '@utils/formatTime';
import { Review } from '@typings/types';
import { Link } from 'react-router-dom';
import ButtonInCard from '@components/ButtonInCard';
import { useState } from 'react';
import Modal from '@components/Modal';

const MyReviewCard = ({ item }: { item: Review }) => {
  const {
    workplaceName,
    workplaceId,
    studyRoomName,
    reviewContent,
    reviewRating,
    reviewDate,
    workplaceImageURL,
  } = item;

  const [modalOpen, setModalOpen] = useState(false);

  const showRatingWithStar = (rating: number) => {
    const result = [];
    for (let i: number = 0; i < 5; i += 1) {
      result.push(
        <span key={i + 1}>{i + 1 <= rating ? <FaStar /> : <FaRegStar />}</span>,
      );
    }

    return result;
  };

  // 리뷰 삭제 함수
  const handleDeleteReview = () => {
    console.log('리뷰 삭제 완료');
    setModalOpen(() => false);
  };

  return (
    <>
      <div className='mx-auto flex w-custom flex-col gap-[13px] border-b border-solid border-b-black px-[13px] py-[26px]'>
        <div className='flex items-start justify-between'>
          <div className='flex cursor-pointer items-center font-medium'>
            <Link
              to={`/detail/${workplaceId}`}
              className='flex items-center gap-1.5'
            >
              {workplaceName}
              <MdArrowForwardIos className='w-3' />
            </Link>
          </div>
          <img
            src={workplaceImageURL}
            alt='스터디룸 사진'
            className='h-[50px] w-[50px] object-cover'
          />
        </div>

        <div className='flex flex-col gap-2'>
          <div className='text-xs'>{studyRoomName}</div>
          <div className='flex text-xs text-primary'>
            {showRatingWithStar(reviewRating)}
          </div>
          <p className='text-sm'>{reviewContent}</p>
        </div>

        <div className='text-xs text-subfont'>
          {getDateFunction(reviewDate)}
        </div>
        <div className='flex gap-1 self-end'>
          <ButtonInCard
            name='삭제'
            onClickFunction={() => setModalOpen(true)}
          />
          <ButtonInCard name='수정' />
        </div>
      </div>

      {modalOpen && (
        <Modal
          message='리뷰를 삭제하시겠습니까?'
          onCancelButtonClick={() => setModalOpen(false)}
          onConfirmButtonClick={handleDeleteReview}
        />
      )}
    </>
  );
};

export default MyReviewCard;
