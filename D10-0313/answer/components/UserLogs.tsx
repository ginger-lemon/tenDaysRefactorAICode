import { FetchStatus } from "../types/fetchType";
import { Log } from "../types/logTypes";

interface MainProps {
    selectedId: number | null;
    logStatus: FetchStatus<Log[]>
}

export default function UserLogs({
    selectedId,
    logStatus
}: MainProps) {
    return (
        <div>

        <h2>User Logs</h2>

        {selectedId ? (<LogList logStatus={logStatus} />) : (<p>select user</p>)}
        {selectedId}

      </div>
    )
}
interface Props {
    logStatus: FetchStatus<Log[]>
}
function LogList({logStatus}: Props) {
    if (logStatus.status === 'loading') {
        return (<p>loading logs...</p>)
    }
    if (logStatus.status === 'success') {
        if (logStatus.data.length > 0) {
            return (
                <ul>
        {logStatus.data?.map((l, i) => (
          <li key={l.id}>
            {l.action} - {l.time}
          </li>
        ))}
      </ul>
            )
        }
    }
    return (<p>no logs</p>)
}