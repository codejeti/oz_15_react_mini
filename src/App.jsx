import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';

const BASE_URL = "https://image.tmdb.org/t/p/w500";
const ORIGINAL_URL = "https://image.tmdb.org/t/p/original"; // 배경화면용 고화질

const MOVIE_LIST_DATA = [
  {
    "adult": false,
    "backdrop_path": "/sR0SpCrXamlIkYMdfz83sFn5JS6.jpg",
    "genre_ids": [878, 28, 12],
    "id": 823464,
    "original_language": "en",
    "original_title": "Godzilla x Kong: The New Empire",
    "overview": "두 타이탄의 전설적인 대결 이후 할로우 어스에 남은 콩은 드디어 애타게 찾던 동족을 발견하지만 그 뒤에 도사리고 있는 예상치 못한 위협에 맞닥뜨린다. 한편, 깊은 동면에 빠진 고질라는 알 수 없는 신호로 인해 깨어나고 푸른 눈의 폭군 스카 킹의 지배 아래 위기에 처한 할로우 어스를 마주하게 된다. 할로우 어스는 물론, 지구상에도 출몰해 전세계를 초토화시키는 타이탄들의 도발 속에서 고질라와 콩은 사상 처음으로 한 팀을 이뤄 반격에 나서기로 하는데…",
    "popularity": 5014.446,
    "poster_path": "/4z1VMmlxHrziG45901esjB4dpIa.jpg",
    "release_date": "2024-03-27",
    "title": "고질라 X 콩: 뉴 엠파이어",
    "video": false,
    "vote_average": 7.243,
    "vote_count": 2019
  },
{
  "adult": false,
  "backdrop_path": "/fqv8v6AycXKsivp1T5yKtLbGXce.jpg",
  "genre_ids": [878, 12, 28],
  "id": 653346,
  "original_language": "en",
  "original_title": "Kingdom of the Planet of the Apes",
  "overview": "진화한 유인원과 퇴화된 인간들이 살아가는 땅. 유인원 리더 프록시무스는 완전한 군림을 위해 인간들을 사냥하며 자신의 제국을 건설한다. 한편, 또 다른 유인원 노아는 우연히 숨겨진 과거의 이야기와 시저의 가르침을 듣게 되고 인간과 유인원이 함께 할 새로운 세상을 꿈꾼다. 어느 날 그의 앞에 나타난 의문의 한 인간 소녀. 노아는 그녀와 함께 자유를 향한 여정을 시작하게 되는데…",
  "popularity": 1585.42,
  "poster_path": "/plNOSbqkSuGEK2i15A5btAXtB7t.jpg",
  "release_date": "2024-05-08",
  "title": "혹성탈출: 새로운 시대",
  "video": false,
  "vote_average": 7.15,
  "vote_count": 526
},
{
  "adult": false,
  "backdrop_path": "/kYgQzzjNis5jJalYtIHgrom0gOx.jpg",
  "genre_ids": [16, 28, 10751, 35, 14],
  "id": 1011985,
  "original_language": "en",
  "original_title": "Kung Fu Panda 4",
  "overview": "마침내 내면의 평화… 냉면의 평화…가 찾아왔다고 믿는 용의 전사 ‘포’ 이젠 평화의 계곡의 영적 지도자가 되고, 자신을 대신할 후계자를 찾아야만 한다. “이제 용의 전사는 그만둬야 해요?” 용의 전사로의 모습이 익숙해지고 새로운 성장을 하기보다 지금 이대로가 좋은 ‘포’ 하지만 모든 쿵푸 마스터들의 능력을 그대로 복제하는 강력한 빌런 ‘카멜레온’이 나타나고 그녀를 막기 위해 정체를 알 수 없는 쿵푸 고수 ‘젠’과 함께 모험을 떠나게 되는데… 포는 가장 강력한 빌런과 자기 자신마저 뛰어넘고 진정한 변화를 할 수 있을까?",
  "popularity": 841.65,
  "poster_path": "/1ZNOOMmILNUzVYbzG1j7GYb5bEV.jpg",
  "release_date": "2024-03-02",
  "title": "쿵푸팬더 4",
  "video": false,
  "vote_average": 7.128,
  "vote_count": 1720
},
{
  "adult": false,
  "backdrop_path": "/pA9J00tOQv2eT5oXGjM7jF9s66y.jpg",
  "genre_ids": [28, 18, 10752],
  "id": 1136318,
  "original_language": "en",
  "original_title": "Battle for Saipan",
  "overview": "1944년 태평양. 사이판을 점령한 미군은 일본군의 항복을 유도하지만 실패한다. 해병대원은 미쳐 날뛰는 일본군을 상대로 최후의 결전에 뛰어든다.",
  "popularity": 732.127,
  "poster_path": "/f1Z5Iq832o0N54x5oVfE59G5F1G.jpg",
  "release_date": "2022-12-01",
  "title": "사이판 전투",
  "video": false,
  "vote_average": 6.3,
  "vote_count": 27
},
{
  "adult": false,
  "backdrop_path": "/H5uE4y4JzUaU5lOTr7YxN9KlyV.jpg",
  "genre_ids": [878, 28, 53],
  "id": 786271,
  "original_language": "zh",
  "original_title": "天降浩劫",
  "overview": "사상 최악의 기상 이변 발생, 고온과 가뭄에 이은 폭풍우가 전 세계를 휩쓸고, 해저 지진에 이은 거대 해일이 도시를 집어삼킨다. 천재 과학자 ‘쉬 박사’는 아내를 구하기 위해 해일을 피해 가장 안전한 곳으로 향한다.",
  "popularity": 718.59,
  "poster_path": "/9v8rP1fV4bI5Hh6z0rVl8D6L0m9.jpg",
  "release_date": "2023-01-26",
  "title": "하늘에서 내리는 재앙",
  "video": false,
  "vote_average": 5.4,
  "vote_count": 5
},
{
  "adult": false,
  "backdrop_path": "/lXowwA16eUuWlE13y172o5I7z2C.jpg",
  "genre_ids": [28, 12, 53],
  "id": 926393,
  "original_language": "en",
  "original_title": "The Beekeeper",
  "overview": "전직 특수부대 출신 에이전트 '비키퍼'의 복수극을 그린 영화",
  "popularity": 699.689,
  "poster_path": "/9tJv4VwB0m2Jd0R2L7tWj36Yw7J.jpg",
  "release_date": "2024-01-10",
  "title": "비키퍼",
  "video": false,
  "vote_average": 7.319,
  "vote_count": 2049
},
{
  "adult": false,
  "backdrop_path": "/z12qZz7x8VbHlYw7s9TthE74sSg.jpg",
  "genre_ids": [28, 12, 10752],
  "id": 558156,
  "original_language": "en",
  "original_title": "The Last Full Measure",
  "overview": "1966년 베트남 전쟁. 전투기 조종사 ‘윌리엄 피츠마이어’의 작전 중 공군 위생병 ‘윌리엄 피츠마이어 주니어’가 위험에 처한 병사들을 구하고 장렬하게 전사한다. 그로부터 32년 후, 국방부 소속 변호사 ‘스코트 허프만’은 그에게 명예 훈장을 수여하기 위해 당시 작전에 참여했던 증인들을 찾아다닌다. 증인들의 증언 속 숨겨진 진실을 파헤치며, ‘윌리엄’의 희생이 헛되지 않도록 그는 고군분투한다.",
  "popularity": 697.554,
  "poster_path": "/9QyQd3g4GvKxK4O8t2n2zD550b7.jpg",
  "release_date": "2020-01-24",
  "title": "마지막 풀 메저",
  "video": false,
  "vote_average": 6.883,
  "vote_count": 242
},
{
  "adult": false,
  "backdrop_path": "/9JBLD3XgO4fV8Vw4wA9N5gQp70n.jpg",
  "genre_ids": [10751, 16, 35, 14],
  "id": 1228227,
  "original_language": "en",
  "original_title": "The Garfield Movie",
  "overview": "평화로운 일상에 난입한 가필드의 친아빠! 완벽했던 하루가 송두리째 뒤흔들리는 가필드 패밀리의 유쾌한 모험이 시작된다!",
  "popularity": 687.202,
  "poster_path": "/yYv9W5sI9o2S5eGk4D7Q1S5g34q.jpg",
  "release_date": "2024-04-30",
  "title": "가필드 더 무비",
  "video": false,
  "vote_average": 7.02,
  "vote_count": 48
},
{
  "adult": false,
  "backdrop_path": "/v5Y4yv37JvjK7R3QhR6xNn5Kq3j.jpg",
  "genre_ids": [28, 18, 53],
  "id": 1109403,
  "original_language": "en",
  "original_title": "The Last Job",
  "overview": "은퇴를 앞둔 전직 용병이 자신의 과거를 쫓는 암살자 집단과 맞서 싸우는 이야기",
  "popularity": 662.646,
  "poster_path": "/e5YtD11gE0tO3W4Y54G2cQ1Gq5c.jpg",
  "release_date": "2023-01-01",
  "title": "더 라스트 잡",
  "video": false,
  "vote_average": 6.091,
  "vote_count": 11
},
{
  "adult": false,
  "backdrop_path": "/qrXK9hQ0133I840h9y5r65K5oR0.jpg",
  "genre_ids": [28, 12, 18],
  "id": 988220,
  "original_language": "en",
  "original_title": "Bad Boys: Ride or Die",
  "overview": "마이애미의 특급 형사 콤비, 마이크와 마커스가 이젠 죽은 지 오래된 콘래드 하워드 경감과 마약 카르텔 간의 유착 의혹을 밝혀내기 위해 경찰 내부의 음모에 맞서 싸우는 이야기.",
  "popularity": 651.925,
  "poster_path": "/jRjU2zXyN4jQf6JbYqJ8n1N0770.jpg",
  "release_date": "2024-06-05",
  "title": "나쁜 녀석들: 라이드 오어 다이",
  "video": false,
  "vote_average": 0,
  "vote_count": 0
},
{
  "adult": false,
  "backdrop_path": "/7gnkkX23eC2z3nL8yYvB91Y4r5G.jpg",
  "genre_ids": [18, 80],
  "id": 894205,
  "original_language": "en",
  "original_title": "A Private Affair",
  "overview": "실종된 남편을 찾기 위한 한 여성의 여정",
  "popularity": 648.337,
  "poster_path": "/4g5Yn82rVlTjUe7yM6Z7n7yRz5N.jpg",
  "release_date": "2022-03-22",
  "title": "사적인 문제",
  "video": false,
  "vote_average": 6.1,
  "vote_count": 29
},
{
  "adult": false,
  "backdrop_path": "/nb3xI8XI3w4pMVZ38VijbsyBqP4.jpg",
  "genre_ids": [18, 36],
  "id": 872585,
  "original_language": "en",
  "original_title": "Oppenheimer",
  "overview": "이론 물리학자 J. 로버트 오펜하이머의 삶과 그가 원자폭탄을 개발하는 과정을 그린 영화",
  "popularity": 640.852,
  "poster_path": "/rW0g3T7Fk6N7rD05p6D4o1q2L6C.jpg",
  "release_date": "2023-07-19",
  "title": "오펜하이머",
  "video": false,
  "vote_average": 8.12,
  "vote_count": 8113
},
{
  "adult": false,
  "backdrop_path": "/8d1g3U8jGvR6Q1xV4jL8n1H7E6t.jpg",
  "genre_ids": [28, 53],
  "id": 1137025,
  "original_language": "en",
  "original_title": "The Last Warrior",
  "overview": "전직 특수부대 출신이 마지막 임무를 맡게 되면서 벌어지는 이야기",
  "popularity": 607.729,
  "poster_path": "/pY93441J2oD1Nn0tP1uTjDk84kL.jpg",
  "release_date": "2023-01-01",
  "title": "최후의 전사",
  "video": false,
  "vote_average": 5.8,
  "vote_count": 10
},
{
  "adult": false,
  "backdrop_path": "/sI6fO8t6jGqEw9vKj9mK85uM0sY.jpg",
  "genre_ids": [28, 80, 53],
  "id": 1121016,
  "original_language": "en",
  "original_title": "The Last Man",
  "overview": "세상이 멸망한 후, 홀로 남은 남자가 생존을 위해 싸우는 이야기",
  "popularity": 607.712,
  "poster_path": "/oXk5Xw9LzT7mPqVlYw4v5y9U9rA.jpg",
  "release_date": "2023-01-01",
  "title": "최후의 남자",
  "video": false,
  "vote_average": 5.7,
  "vote_count": 10
},
{
  "adult": false,
  "backdrop_path": "/5a4y2gVw9x2j4h3v9J6q1Z5Nn2x.jpg",
  "genre_ids": [28, 12, 53],
  "id": 1122401,
  "original_language": "en",
  "original_title": "The Last Stop",
  "overview": "마지막 정류장에서 벌어지는 미스터리 스릴러",
  "popularity": 607.576,
  "poster_path": "/y59n9wE2XkR5L0QJg2V84Y93Z5N.jpg",
  "release_date": "2023-01-01",
  "title": "마지막 정류장",
  "video": false,
  "vote_average": 5.9,
  "vote_count": 10
},
{
  "adult": false,
  "backdrop_path": "/5X3y0b72c918F9P8o5Gv7vYpW4c.jpg",
  "genre_ids": [28, 53],
  "id": 1122402,
  "original_language": "en",
  "original_title": "The Last Stand",
  "overview": "마지막 전투에서 살아남기 위한 전사들의 이야기",
  "popularity": 607.412,
  "poster_path": "/7y9X9H9j5E1FjB2v3yVl4X5r9jE.jpg",
  "release_date": "2023-01-01",
  "title": "최후의 저항",
  "video": false,
  "vote_average": 5.6,
  "vote_count": 10
},
{
  "adult": false,
  "backdrop_path": "/5X3y0b72c918F9P8o5Gv7vYpW4c.jpg",
  "genre_ids": [28, 53],
  "id": 1122403,
  "original_language": "en",
  "original_title": "The Last Fight",
  "overview": "마지막 싸움에서 승리하기 위한 두 남자의 이야기",
  "popularity": 607.247,
  "poster_path": "/7y9X9H9j5E1FjB2v3yVl4X5r9jE.jpg",
  "release_date": "2023-01-01",
  "title": "마지막 싸움",
  "video": false,
  "vote_average": 5.6,
  "vote_count": 10
},
{
  "adult": false,
  "backdrop_path": "/5X3y0b72c918F9P8o5Gv7vYpW4c.jpg",
  "genre_ids": [28, 53],
  "id": 1122404,
  "original_language": "en",
  "original_title": "The Last Journey",
  "overview": "마지막 여정을 떠나는 노인의 이야기",
  "popularity": 607.082,
  "poster_path": "/7y9X9H9j5E1FjB2v3yVl4X5r9jE.jpg",
  "release_date": "2023-01-01",
  "title": "마지막 여정",
  "video": false,
  "vote_average": 5.6,
  "vote_count": 10
},
{
  "adult": false,
  "backdrop_path": "/5X3y0b72c918F9P8o5Gv7vYpW4c.jpg",
  "genre_ids": [28, 53],
  "id": 1122405,
  "original_language": "en",
  "original_title": "The Last Hope",
  "overview": "마지막 희망을 찾아 떠나는 사람들의 이야기",
  "popularity": 606.918,
  "poster_path": "/7y9X9H9j5E1FjB2v3yVl4X5r9jE.jpg",
  "release_date": "2023-01-01",
  "title": "마지막 희망",
  "video": false,
  "vote_average": 5.6,
  "vote_count": 10
},
{
  "adult": false,
  "backdrop_path": "/5X3y0b72c918F9P8o5Gv7vYpW4c.jpg",
  "genre_ids": [28, 53],
  "id": 1122406,
  "original_language": "en",
  "original_title": "The Last Day",
  "overview": "마지막 날을 보내는 사람들의 이야기",
  "popularity": 606.753,
  "poster_path": "/7y9X9H9j5E1FjB2v3yVl4X5r9jE.jpg",
  "release_date": "2023-01-01",
  "title": "마지막 날",
  "video": false,
  "vote_average": 5.6,
  "vote_count": 10
},
{
  "adult": false,
  "backdrop_path": "/5X3y0b72c918F9P8o5Gv7vYpW4c.jpg",
  "genre_ids": [28, 53],
  "id": 1122407,
  "original_language": "en",
  "original_title": "The Last Breath",
  "overview": "마지막 숨을 쉬는 사람의 이야기",
  "popularity": 606.589,
  "poster_path": "/7y9X9H9j5E1FjB2v3yVl4X5r9jE.jpg",
  "release_date": "2023-01-01",
  "title": "마지막 숨",
  "video": false,
  "vote_average": 5.6,
  "vote_count": 10
},
{
  "adult": false,
  "backdrop_path": "/5X3y0b72c918F9P8o5Gv7vYpW4c.jpg",
  "genre_ids": [28, 53],
  "id": 1122408,
  "original_language": "en",
  "original_title": "The Last Wish",
  "overview": "마지막 소원을 비는 사람의 이야기",
  "popularity": 606.424,
  "poster_path": "/7y9X9H9j5E1FjB2v3yVl4X5r9jE.jpg",
  "release_date": "2023-01-01",
  "title": "마지막 소원",
  "video": false,
  "vote_average": 5.6,
  "vote_count": 10
},
{
  "adult": false,
  "backdrop_path": "/5X3y0b72c918F9P8o5Gv7vYpW4c.jpg",
  "genre_ids": [28, 53],
  "id": 1122409,
  "original_language": "en",
  "original_title": "The Last Promise",
  "overview": "마지막 약속을 지키는 사람의 이야기",
  "popularity": 606.26,
  "poster_path": "/7y9X9H9j5E1FjB2v3yVl4X5r9jE.jpg",
  "release_date": "2023-01-01",
  "title": "마지막 약속",
  "video": false,
  "vote_average": 5.6,
  "vote_count": 10
},
{
  "adult": false,
  "backdrop_path": "/5X3y0b72c918F9P8o5Gv7vYpW4c.jpg",
  "genre_ids": [28, 53],
  "id": 1122410,
  "original_language": "en",
  "original_title": "The Last Word",
  "overview": "마지막 말을 전하는 사람의 이야기",
  "popularity": 606.095,
  "poster_path": "/7y9X9H9j5E1FjB2v3yVl4X5r9jE.jpg",
  "release_date": "2023-01-01",
  "title": "마지막 말",
  "video": false,
  "vote_average": 5.6,
  "vote_count": 10
},
{
  "adult": false,
  "backdrop_path": "/5X3y0b72c918F9P8o5Gv7vYpW4c.jpg",
  "genre_ids": [28, 53],
  "id": 1122411,
  "original_language": "en",
  "original_title": "The Last Laugh",
  "overview": "마지막 웃음을 선사하는 사람의 이야기",
  "popularity": 605.931,
  "poster_path": "/7y9X9H9j5E1FjB2v3yVl4X5r9jE.jpg",
  "release_date": "2023-01-01",
  "title": "마지막 웃음",
  "video": false,
  "vote_average": 5.6,
  "vote_count": 10
},
{
  "adult": false,
  "backdrop_path": "/5X3y0b72c918F9P8o5Gv7vYpW4c.jpg",
  "genre_ids": [28, 53],
  "id": 1122412,
  "original_language": "en",
  "original_title": "The Last Tear",
  "overview": "마지막 눈물을 흘리는 사람의 이야기",
  "popularity": 605.766,
  "poster_path": "/7y9X9H9j5E1FjB2v3yVl4X5r9jE.jpg",
  "release_date": "2023-01-01",
  "title": "마지막 눈물",
  "video": false,
  "vote_average": 5.6,
  "vote_count": 10
}
];

const MOVIE_DETAIL_DATA = {
  "adult": false,
  "backdrop_path": "/kYgQzzjNis5jJalYtIHgrom0gOx.jpg",
  "belongs_to_collection": {
    "id": 77816,
    "name": "쿵푸팬더 시리즈",
    "poster_path": "/xoYc0RYKSc3xC4S9OpPZxKocKtj.jpg",
    "backdrop_path": "/uDosHOFFWtF5YteBRygHALFqLw2.jpg"
  },
  "budget": 85000000,
  "genres": [
    { "id": 16, "name": "애니메이션" },
    { "id": 28, "name": "액션" },
    { "id": 10751, "name": "가족" },
    { "id": 35, "name": "코미디" },
    { "id": 14, "name": "판타지" }
  ],
  "homepage": "",
  "id": 1011985,
  "imdb_id": "tt21692408",
  "origin_country": ["US"],
  "original_language": "en",
  "original_title": "Kung Fu Panda 4",
  "overview": "마침내 내면의 평화… 냉면의 평화…가 찾아왔다고 믿는 용의 전사 '포' 이젠 평화의 계곡의 영적 지도자가 되고, 자신을 대신할 후계자를 찾아야만 한다. \"이제 용의 전사는 그만둬야 해요?\" 용의 전사로의 모습이 익숙해지고 새로운 성장을 하기보다 지금 이대로가 좋은 '포' 하지만 모든 쿵푸 마스터들의 능력을 그대로 복제하는 강력한 빌런 '카멜레온'이 나타나고 그녀를 막기 위해 정체를 알 수 없는 쿵푸 고수 '젠'과 함께 모험을 떠나게 되는데… 포는 가장 강력한 빌런과 자기 자신마저 뛰어넘고 진정한 변화를 할 수 있을까?",
  "popularity": 1037.028,
  "poster_path": "/1ZNOOMmILNUzVYbzG1j7GYb5bEV.jpg",
  "production_companies": [
    {
      "id": 521,
      "logo_path": "/kP7t6RwGz2AvvTkvnI1uteEwHet.png",
      "name": "DreamWorks Animation",
      "origin_country": "US"
    }
  ],
  "production_countries": [
    { "iso_3166_1": "US", "name": "United States of America" }
  ],
  "release_date": "2024-03-02",
  "revenue": 533540090,
  "runtime": 94,
  "spoken_languages": [
    { "english_name": "English", "iso_639_1": "en", "name": "English" }
  ],
  "status": "Released",
  "tagline": "오랜만이지! 드림웍스 레전드 시리즈 마침내 컴백!",
  "title": "쿵푸팬더 4",
  "video": false,
  "vote_average": 7.135,
  "vote_count": 1751
};

// ----------------------------------------------------------------------
// [COMPONENTS]
// ----------------------------------------------------------------------

/**
 * NavBar: 상단 네비게이션
 */
const NavBar = () => (
  <nav className="bg-black/90 text-white px-6 py-4 flex justify-between items-center sticky top-0 z-50 backdrop-blur-sm border-b border-gray-800">
  <Link to="/" className="text-2xl font-black text-red-600 tracking-tighter hover:scale-105 transition-transform">
  OZ Movie
  </Link>
  <div className="flex gap-6 text-sm font-medium">
  <Link to="/" className="hover:text-red-500 transition-colors">홈</Link>
  <Link to="/movie/1011985" className="hover:text-red-500 transition-colors">상세정보 (Dummy: 쿵푸팬더)</Link>
  </div>
  </nav>
);

/**
 * HeroCarousel: 메인 상단 슬라이더
 */
const HeroCarousel = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredMovies = movies.slice(0, 3); // 상위 3개만 슬라이더에 표시

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredMovies.length);
  };

  // 자동 슬라이드 효과 (5초마다)
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  // 현재 영화 데이터
  const currentMovie = featuredMovies[currentIndex];
  if (!currentMovie) return null;

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden mb-12 group">
    {/* 배경 이미지 */}
    <div
    className="w-full h-full bg-cover bg-center transition-all duration-700 ease-in-out transform"
    style={{
      backgroundImage: `url(${ORIGINAL_URL}${currentMovie.backdrop_path})`,
    }}
    >
    {/* 그라데이션 오버레이 */}
    <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-black/40 to-transparent"></div>
    </div>

    {/* 영화 정보 텍스트 */}
    <div className="absolute bottom-0 left-0 p-8 md:p-16 w-full md:w-2/3 space-y-4">
    <h2 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
    {currentMovie.title}
    </h2>
    <p className="text-gray-200 text-lg line-clamp-2 drop-shadow-md hidden md:block">
    {currentMovie.overview}
    </p>
    {/* Link 컴포넌트로 변경 */}
    <Link
    to={`/movie/${currentMovie.id}`}
    className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-md transition-colors shadow-lg mt-4"
    >
    상세보기
    </Link>
    </div>

    {/* 네비게이션 버튼 및 인디케이터 생략 (코드 간소화) */}
    </div>
  );
};

/**
 * MovieCard: 영화 카드 컴포넌트
 */
const MovieCard = ({ movie }) => {
  return (
    // Link 컴포넌트로 변경하여 클릭 시 라우팅
    <Link
    to={`/movie/${movie.id}`}
    className="group bg-[#1f1f1f] rounded-lg overflow-hidden relative cursor-pointer hover:shadow-2xl hover:shadow-red-900/20 transition-all duration-300 hover:-translate-y-2"
    >
    {/* 포스터 이미지 */}
    <div className="relative overflow-hidden aspect-[2/3]">
    <img
    src={`${BASE_URL}${movie.poster_path}`}
    alt={movie.title}
    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
    loading="lazy"
    />
    {/* 호버 시 나타나는 오버레이 */}
    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
    <span className="text-white border border-white px-4 py-2 rounded-full hover:bg-white hover:text-black transition-colors">
    상세보기
    </span>
    </div>
    </div>

    {/* 정보 영역 */}
    <div className="p-4">
    <h3 className="font-bold text-lg truncate mb-1 group-hover:text-red-500 transition-colors">{movie.title}</h3>
    <div className="flex justify-between items-center text-sm text-gray-400">
    <span>{movie.release_date}</span>
    <div className="flex items-center gap-1 text-yellow-500">
    <span>★</span>
    <span>{movie.vote_average.toFixed(1)}</span>
    </div>
    </div>
    </div>
    </Link>
  );
};

/**
 * MainPage: 메인 페이지 (캐러셀 + 그리드)
 */
const MainPage = () => {
  const [movies] = useState(MOVIE_LIST_DATA);

  return (
    <div>
    <HeroCarousel movies={movies} />

    {/* 메인 리스트 섹션 */}
    <div className="max-w-7xl mx-auto px-6 pb-12">
    <div className="flex items-end gap-3 mb-6">
    <h2 className="text-2xl font-bold">현재 상영작</h2>
    <span className="text-sm text-gray-400 mb-1">Top Rated Movies</span>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
    {/* 이제 더 많은 영화 카드가 표시됩니다. */}
    {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
    </div>
    </div>
    </div>
  );
};


const MovieDetail = () => {
  // useParams 훅을 사용하여 URL에서 영화 ID를 가져옵니다.
  const { id } = useParams();

  // 하드코딩된 전체 목록에서 ID에 해당하는 영화를 먼저 찾습니다.
  // 실제 상세 데이터가 있는 경우 (쿵푸팬더)를 위해 || MOVIE_DETAIL_DATA 로 대체 로직을 유지합니다.
  const movie = MOVIE_LIST_DATA.find(m => m.id.toString() === id) || (id === MOVIE_DETAIL_DATA.id.toString() ? MOVIE_DETAIL_DATA : null);

  useEffect(() => {
    // 페이지 이동 시 스크롤 맨 위로 이동
    window.scrollTo(0, 0);
  }, [id]);

  if (!movie) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
      <h1 className="text-3xl font-bold text-red-500">404 - 영화를 찾을 수 없습니다. (ID: {id})</h1>
      <Link to="/" className="mt-4 inline-block text-gray-400 hover:text-red-500 transition-colors">홈으로 돌아가기</Link>
      </div>
    );
  }

  // 장르 데이터가 없을 경우 (목록 데이터만 있는 경우)를 대비해 MOVIE_DETAIL_DATA의 장르를 사용합니다.
  // 실제 데이터에서는 API에서 장르를 포함한 상세 정보를 받아와야 합니다.
  const genres = movie.genres && movie.genres.length > 0 ? movie.genres : (movie.id === MOVIE_DETAIL_DATA.id ? MOVIE_DETAIL_DATA.genres : []);


  return (
    <div className="relative">
    {/* 배경 백드롭 이미지 영역 */}
    <div
    className="relative w-full h-[500px] overflow-hidden"
    >
    <div
    className="absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: `url(${ORIGINAL_URL}${movie.backdrop_path})` }}
    >
    {/* 이미지 위에 투명도를 주는 오버레이 (밝기 낮추기) */}
    <div className="absolute inset-0 bg-black/70"></div>
    {/* 바닥에서 올라오는 그라데이션 (콘텐츠와 자연스럽게 연결) */}
    <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent"></div>
    </div>
    </div>

    {/* 콘텐츠 영역 */}
    <div className="max-w-7xl mx-auto px-6 py-12 relative z-10 -mt-[400px] md:-mt-[400px]">
    <div className="flex flex-col md:flex-row gap-10 items-start mt-20">
    {/* 포스터 */}
    <div className="w-64 md:w-80 flex-shrink-0 mx-auto md:mx-0 shadow-2xl rounded-xl overflow-hidden border-4 border-[#2a2a2a]">
    <img
    src={`${BASE_URL}${movie.poster_path}`}
    alt={movie.title}
    className="w-full h-auto"
    />
    </div>

    {/* 정보 텍스트 */}
    <div className="flex-1 space-y-6 text-center md:text-left">
    <div>
    <h1 className="text-4xl md:text-5xl font-black mb-2">{movie.title}</h1>
    <p className="text-xl text-gray-400 italic">{movie.tagline}</p>
    <p className="text-sm text-gray-500 mt-1">ID: {id}</p> {/* 현재 라우트 ID 표시 */}
    </div>

    <div className="flex flex-wrap justify-center md:justify-start gap-3">
    {genres.length > 0 ? (
      genres.map(g => (
        <span key={g.id} className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300 border border-gray-700">
        {g.name}
        </span>
      ))
    ) : (
      <span className="px-3 py-1 text-gray-500 text-sm">장르 정보 없음 (목록 데이터)</span>
    )}
    </div>

    <div className="flex items-center justify-center md:justify-start gap-6 text-lg">
    <div className="flex items-center gap-2">
    <span className="text-yellow-500 text-2xl">★</span>
    <span className="font-bold">{movie.vote_average.toFixed(1)}</span>
    <span className="text-gray-500 text-sm">({movie.vote_count}명 참여)</span>
    </div>
    <div className="text-gray-400">|</div>
    <div>{movie.runtime || '정보 없음'}분</div>
    </div>

    <div className="bg-[#1f1f1f] p-6 rounded-xl border border-gray-800">
    <h3 className="text-xl font-bold mb-3 text-red-500">줄거리</h3>
    <p className="text-gray-300 leading-relaxed text-lg">
    {movie.overview}
    </p>
    </div>
    </div>
    </div>
    </div>
    </div>
  );
};

/**
 * App: 메인 컴포넌트 (React Router 설정)
 */
export default function App() {
  return (
    <Router>
    <div className="bg-[#141414] min-h-screen text-white font-sans">
    <NavBar />
    <main>
    {/* Routes 설정 */}
    <Routes>
    <Route path="/" element={<MainPage />} />
    <Route path="/movie/:id" element={<MovieDetail />} />
    <Route path="*" element={<NotFound />} />
    </Routes>
    </main>
    <footer className="text-center py-8 text-gray-500 text-sm border-t border-gray-800 mt-12">
    © 2024 OZ Movie Project. All rights reserved.
    </footer>
    </div>
    </Router>
  );
}

// 404 페이지 컴포넌트
const NotFound = () => (
  <div className="max-w-7xl mx-auto px-6 py-20 text-center">
  <h1 className="text-4xl font-black text-red-600 mb-4">404 Page Not Found</h1>
  <p className="text-xl text-gray-400 mb-8">요청하신 페이지를 찾을 수 없습니다.</p>
  <Link to="/" className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-md transition-colors shadow-lg">
  홈으로 돌아가기
  </Link>
  </div>
);
