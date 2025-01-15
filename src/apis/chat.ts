import {
  ChatListBusiness,
  ChatListMember,
  ChatMessageResponse,
} from '@typings/types';
import { authInstance } from '.';

// 메시지 기록 조회
export const getMessage = async (
  roomId: number,
  date: Date,
): Promise<ChatMessageResponse[]> => {
  const response = await authInstance.get(`/api/v1/chat/room/${roomId}`, {
    params: { cursor: date },
  });
  return response.data;
};

// 채팅방 목록 조회 (사용자)
export const getChatListMember = async (
  date: Date,
): Promise<ChatListMember[]> => {
  const response = await authInstance.get('/api/v1/chat/room', {
    params: { cursor: date },
  });
  return response.data;
};

// 채팅방 목록 조회 (사업자)
export const getChatListBusiness = async (
  date: Date,
): Promise<ChatListBusiness[]> => {
  const response = await authInstance.get('/api/v1/chat/room', {
    params: { cursor: date },
  });
  return response.data;
};

// 채팅방 생성 요청
export const postCreateChatRoom = async (
  workplaceId: number,
): Promise<number> => {
  const response = await authInstance.post('/api/v1/chat/create', {
    workplaceId,
  });
  return response.data;
};
