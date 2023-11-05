export default function Logo() {
  const aleksandarClasses = `aleksandar drop-shadow-md drop-shadow-black absolute top-1/2 left-1/2 font-sans text-4xl text-white`;
  const onlineClasses = `online absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] font-script text-red-500`;
  return (
    <div className="logo relative">
      <span className={aleksandarClasses}>aleksandar</span>
      <span className={onlineClasses}>.Online</span>
    </div>
  );
}
