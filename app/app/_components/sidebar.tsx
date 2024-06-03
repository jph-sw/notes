export function Sidebar(props: { children: any }) {
  return (
    <div className="min-h-screen w-full flex">
      <div className="min-h-screen w-[10vw] xl:w-[15vw]  border-e"></div>
      <div>
        <div className="w-full border-b h-[5vh]"></div>
        {props.children}
      </div>
    </div>
  );
}
