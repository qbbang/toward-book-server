import axios from 'axios';

import CONFIG from '../config';
import { logger } from '../config/winston';

export default async (title) => {
  return axios({
    url: CONFIG.search.naver.url,
    method: 'get',
    params: {
      query: title, // 책 검색 텍스트
      start: 1, // 검색 시작 위치
      display: 6, // 가져올 책 개수
      sort: 'sim', // 정렬 유형 (sim: 유사도)
    },
    headers: {
      'X-Naver-Client-Id': process.env.Naver_Client_Id,
      'X-Naver-Client-Secret': process.env.Naver_Client_SECRET,
    },
  })
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      }
      return false;
    })
    .catch((e) => {
      logger.error(e);
      return e;
    });
};
