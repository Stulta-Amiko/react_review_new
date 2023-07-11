import React from 'react'

import ChartList from '../components/ChartList'
import './Admin_Pages.css'

const CLIENT_DUMMY = [
  {
    id: 'p1',
    name: 'OOO',
    address: 'OO도 OO시 OO구 OO동',
    birthday: '0000년 00월 00일',
    checksDate: '0000-00-00',
  },
  {
    id: 'p2',
    name: 'OOO',
    address: 'OO도 OO시 OO구 OO동',
    birthday: '0000년 00월 00일',
    checksDate: '0000-00-00',
  },
  {
    id: 'p3',
    name: 'OOO',
    address: 'OO도 OO시 OO구 OO동',
    birthday: '0000년 00월 00일',
    checksDate: '0000-00-00',
  },
  {
    id: 'p4',
    name: 'OOO',
    address: 'OO도 OO시 OO구 OO동',
    birthday: '0000년 00월 00일',
    checksDate: '0000-00-00',
  },
  {
    id: 'p5',
    name: 'OOO',
    address: 'OO도 OO시 OO구 OO동',
    birthday: '0000년 00월 00일',
    checksDate: '0000-00-00',
  },
  {
    id: 'p6',
    name: 'OOO',
    address: 'OO도 OO시 OO구 OO동',
    birthday: '0000년 00월 00일',
    checksDate: '0000-00-00',
  },
  {
    id: 'p7',
    name: 'OOO',
    address: 'OO도 OO시 OO구 OO동',
    birthday: '0000년 00월 00일',
    checksDate: '0000-00-00',
  },
  {
    id: 'p8',
    name: 'OOO',
    address: 'OO도 OO시 OO구 OO동',
    birthday: '0000년 00월 00일',
    checksDate: '0000-00-00',
  },
  {
    id: 'p9',
    name: 'OOO',
    address: 'OO도 OO시 OO구 OO동',
    birthday: '0000년 00월 00일',
    checksDate: '0000-00-00',
  },
  {
    id: 'p10',
    name: 'OOO',
    address: 'OO도 OO시 OO구 OO동',
    birthday: '0000년 00월 00일',
    checksDate: '0000-00-00',
  },
]

const Admin_Pages = () => {
  return (
    <React.Fragment>
      <div role='region' aria-label='data table' tabindex='0' class='primary'>
        <table>
          <thead>
            <tr>
              <th class='pin'> </th>
              <th>이름</th>
              <th>주소</th>
              <th>생년월일</th>
              <th>체크현황</th>
              <th>알림보내기</th>
            </tr>
          </thead>

          <ChartList items={CLIENT_DUMMY} />
        </table>
      </div>
    </React.Fragment>
  )
}

export default Admin_Pages
