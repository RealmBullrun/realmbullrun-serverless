import dynamic from 'next/dynamic';
const ReactJson = dynamic(() => import('react-json-view'), { ssr: false });

export default function ProfileContent({ data }: { data: any }) {

  return (
    <div>
      <ReactJson src={data} collapsed={true} theme="monokai" />
      {/* {
        typeof document !== "undefined" ? (
          <ReactJson src={data} theme="monokai" />
        ) : (
          <></>
        )
      } */}
    </div>
  )
}