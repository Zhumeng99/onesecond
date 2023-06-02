import React, { useEffect, useState } from 'react'
import { getSongListType, getTopPlaylist } from '@/service/index'
import { useRequest } from 'ahooks'
// import type { IsSongTypeList } from '@/service'
// 类型断层
export default function Home() {
  // const [SongListType, SetSongListType] = useState<IsSongTypeList['sub']>([])
  const [SongListType, SetSongListType] = useState<
    Awaited<ReturnType<typeof getSongListType>>['data']['sub']
  >([])
  useEffect(() => {
    getSongListType()
      .then((res) => {
        SetSongListType(res.data.sub)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const { data: toPlaylist } = useRequest(() => getTopPlaylist({ cat: '全部' }))
  return (
    <>
      <ul>
        {toPlaylist?.map((item) => (
          <li key={item.id}>{item.description}</li>
        ))}
      </ul>
      <ul>
        {SongListType.map((item) => (
          <li key={item.name}>{item.name}</li>
        ))}
      </ul>
    </>
  )
}
