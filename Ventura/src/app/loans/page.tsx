"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { useStateContext } from "@/context";
import { useRouter } from "next/navigation";

interface Lender {
  address: string;
  amount: number;
}

interface Loan {
  name: string;
  amount: number;
  duration: number | bigint;
  amountCollected: number;
  repaid: boolean;
  requester: string;
  address: string;
  purpose: string;
  lenders: Lender[];
  lId: number;
}

type SortOrder = "asc" | "desc";

export default function Component() {
  const router = useRouter();
  const { getLoanRequests, lendLoan, address, withdrawLoanFunds, repayLoan } =
    useStateContext();
  const [loans, setLoans] = useState<Loan[]>([]);
  const [filteredLoans, setFilteredLoans] = useState<Loan[]>(loans);
  const [sortOrder, setSortOrder] = useState<{
    key: keyof Loan;
    order: SortOrder;
  }>({
    key: "name",
    order: "asc",
  });

  // Fetch loans from the blockchain when the component mounts
  useEffect(() => {
    async function fetchLoans() {
      const loanData = await getLoanRequests();
      setLoans(loanData);
      setFilteredLoans(loanData); // Initially set filteredLoans to all fetched loans
    }

    fetchLoans();
  }, [getLoanRequests]);

  const sortLoans = (key: keyof Loan) => {
    const newOrder = sortOrder.order === "asc" ? "desc" : "asc";
    const sortedLoans = [...filteredLoans].sort((a, b) => {
      if (typeof a[key] === "string") {
        return newOrder === "asc"
          ? (a[key] as string).localeCompare(b[key] as string)
          : (b[key] as string).localeCompare(a[key] as string);
      }
      // Handle BigInt comparison
      if (typeof a[key] === "bigint") {
        return newOrder === "asc"
          ? (a[key] as bigint) < (b[key] as bigint)
            ? -1
            : 1
          : (a[key] as bigint) > (b[key] as bigint)
          ? -1
          : 1;
      }
      return newOrder === "asc"
        ? (a[key] as number) - (b[key] as number)
        : (b[key] as number) - (a[key] as number);
    });
    setFilteredLoans(sortedLoans);
    setSortOrder({ key, order: newOrder });
  };

  const renderSortIcon = (key: keyof Loan) => {
    if (sortOrder.key !== key) return null;
    return sortOrder.order === "asc" ? (
      <ArrowUp size={14} />
    ) : (
      <ArrowDown size={14} />
    );
  };
  return (
    <Card className="max-w-3xl mx-auto h-[90vh] border-neutral-500 bg-zinc-800">
      <CardHeader className="px-7 flex justify-between flex-row">
        <div className="flex-col space-y-2">
          <CardTitle>Loans</CardTitle>
          <CardDescription>View and request loans</CardDescription>
        </div>
        <Button
          onClick={() => {
            router.push("/loans/request-loan");
          }}
          className="w-36"
          variant="outline"
          size="sm"
        >
          Request Loan
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                onClick={() => sortLoans("name")}
                className="cursor-pointer"
              >
                <span>Name </span>
                {renderSortIcon("name")}
              </TableHead>
              <TableHead
                onClick={() => sortLoans("amount")}
                className="cursor-pointer"
              >
                <span>Amount </span>
                {renderSortIcon("amount")}
              </TableHead>
              <TableHead
                onClick={() => sortLoans("duration")}
                className="cursor-pointer"
              >
                <span>Duration </span> {renderSortIcon("duration")}
              </TableHead>
              <TableHead>Collected</TableHead>
              <TableHead>Repaid</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLoans.map((loan, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="font-medium">{loan.name}</div>
                </TableCell>
                <TableCell>{loan.amount.toLocaleString()} AVAX</TableCell>
                <TableCell>{Number(loan.duration)} months</TableCell>
                <TableCell>
                  {loan.amountCollected > 0
                    ? loan.amountCollected.toLocaleString() + " AVAX"
                    : "0 AVAX"}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={loan.repaid ? "secondary" : "destructive"}
                    className="text-xs"
                  >
                    {loan.repaid ? "Repaid" : "Pending"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <div className="space-y-4 py-6">
                        <div>
                          <p className="font-medium">Requester:</p>
                          <p>{loan.requester.substring(0, 6)}...</p>
                          <p className="text-muted-foreground">
                            {loan.address}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium">Purpose:</p>
                          <p>{loan.purpose}</p>
                        </div>
                        <div>
                          <p className="font-medium">Lenders:</p>
                          <div className="grid gap-2">
                            {loan.lenders.map((lender, lenderIndex) => (
                              <div
                                key={lenderIndex}
                                className="flex items-center gap-2"
                              >
                                <div className="font-medium">
                                  {lender.address.substring(0, 6)}...
                                </div>
                                <div>{lender.amount.toLocaleString()} AVAX</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        {loan.requester != address ? (
                          <Button
                            onClick={() =>
                              lendLoan(loan.lId, loan.amount.toString())
                            }
                            variant="outline"
                            size="sm"
                          >
                            Lend
                          </Button>
                        ) : (
                          <div className="flex gap-2">
                            <Button
                              onClick={() => {
                                repayLoan(
                                  loan.lId,
                                  (
                                    Number(loan.amount) +
                                    Number(loan.amount / 10)
                                  ).toString()
                                );
                              }}
                              variant="outline"
                              size="sm"
                            >
                              Repay Loan
                            </Button>
                            <Button
                              onClick={() => withdrawLoanFunds(loan.lId)}
                              variant="outline"
                              size="sm"
                            >
                              Withdraw
                            </Button>
                          </div>
                        )}
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
