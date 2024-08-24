import { Card } from "@/components/ui/card";

export function Stats() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto p-4 md:p-6">
      <Card className="bg-card p-6 rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-neon">
        <div className="flex items-center gap-4">
          <div className="bg-muted rounded-md p-3 flex items-center justify-center">
            <TrendingUpIcon className="w-6 h-6 text-muted-foreground" />
          </div>
          <div className="grid gap-1">
            <h3 className="text-lg font-semibold">Total Investments</h3>
            <div className="text-4xl font-bold">$2.3M</div>
          </div>
        </div>
      </Card>
      <Card className="bg-card p-6 rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-neon">
        <div className="flex items-center gap-4">
          <div className="bg-muted rounded-md p-3 flex items-center justify-center">
            <UsersIcon className="w-6 h-6 text-muted-foreground" />
          </div>
          <div className="grid gap-1">
            <h3 className="text-lg font-semibold">Active Investors</h3>
            <div className="text-4xl font-bold">1,245</div>
          </div>
        </div>
      </Card>
      <Card className="bg-card p-6 rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-neon">
        <div className="flex items-center gap-4">
          <div className="bg-muted rounded-md p-3 flex items-center justify-center">
            <DollarSignIcon className="w-6 h-6 text-muted-foreground" />
          </div>
          <div className="grid gap-1">
            <h3 className="text-lg font-semibold">Average Investment</h3>
            <div className="text-4xl font-bold">$1,850</div>
          </div>
        </div>
      </Card>
      <Card className="bg-card p-6 rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-neon">
        <div className="flex items-center gap-4">
          <div className="bg-muted rounded-md p-3 flex items-center justify-center">
            <WalletIcon className="w-6 h-6 text-muted-foreground" />
          </div>
          <div className="grid gap-1">
            <h3 className="text-lg font-semibold">Total Earnings</h3>
            <div className="text-4xl font-bold">$450K</div>
          </div>
        </div>
      </Card>
      <Card className="bg-card p-6 rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-neon">
        <div className="flex items-center gap-4">
          <div className="bg-muted rounded-md p-3 flex items-center justify-center">
            <BarChartIcon className="w-6 h-6 text-muted-foreground" />
          </div>
          <div className="grid gap-1">
            <h3 className="text-lg font-semibold">Avg. Annual Return</h3>
            <div className="text-4xl font-bold">18%</div>
          </div>
        </div>
      </Card>
      <Card className="bg-card p-6 rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-neon">
        <div className="flex items-center gap-4">
          <div className="bg-muted rounded-md p-3 flex items-center justify-center">
            <ClockIcon className="w-6 h-6 text-muted-foreground" />
          </div>
          <div className="grid gap-1">
            <h3 className="text-lg font-semibold">Avg. Investment Duration</h3>
            <div className="text-4xl font-bold">3.2 years</div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function BarChartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  );
}

function ClockIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function DollarSignIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function TrendingUpIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

function UsersIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function WalletIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </svg>
  );
}
