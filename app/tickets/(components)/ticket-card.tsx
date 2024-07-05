import StatusDisplay from "./status-display";
import PriorityDisplay from "./priority-display";
import ProgressDisplay from "./progress-display";
import Link from "next/link";

const TicketCard = ({ ticket }: { ticket: Ticket }) => {
  function formatTimestamp(timestamp: string) {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    const date = new Date(timestamp);
    const formattedDate = date.toLocaleString("en-US", options);

    return formattedDate;
  }

  const createdDateTime = formatTimestamp(ticket.created_at);

  return (
    <div className="flex flex-col hover:bg-card-hover rounded-md shadow-lg p-3">
      <div className="flex mb-3">
        <PriorityDisplay priority={ticket.priority} />
        <div className="ml-auto">
          <p className="text-xs my-1">{ticket.category}</p>
        </div>
      </div>
      <Link href={`/tickets/${ticket.id}/edit`} style={{ display: "contents" }}>
        <h4 className="mb-1">{ticket.title}</h4>
        <hr className="h-px  border-0 bg-page mb-2 "></hr>
        <p className="whitespace-pre-wrap">{ticket.description}</p>

        <div className="flex-grow"></div>
        <div className="flex mt-2">
          <div className="flex flex-col">
            <p className="text-xs  my-1">{createdDateTime}</p>
            <ProgressDisplay progress={ticket.progress} />
          </div>
          <div className="ml-auto  flex items-end">
            <StatusDisplay status={ticket.status} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TicketCard;
