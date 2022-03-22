export default function Logo({ small, icon }: { small?: boolean; icon?: boolean }) {
  return (
    <h1 className="inline">
      <strong>
        {icon ? (
          <img className="mx-auto w-9" alt="ns" title="Northstarre" src="/favicon.ico" />
        ) : (
          <img
            className={small ? "h-4 w-auto" : "h-5 w-auto"}
            alt="NS"
            title="Northstarre"
            src="/favicon.ico"
          />
        )}
      </strong>
    </h1>
  );
}
