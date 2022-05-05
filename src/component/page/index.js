import {useGetAllDataQuery} from "./pageAPI";
import 'bootstrap/dist/css/bootstrap.css';


export const Page = () => {
    const {data: rockets, isLoading, isFetching} = useGetAllDataQuery();
    if (isLoading || isFetching) {
        return <div>Loading</div>;
    }

    return (
        rockets.map((rocket, index) =>

            <div className="row">
                <div className="col-xxl-4 card text-dark bg-info mb-3">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">Mission Name: {rocket.mission_name}</h2>
                            <p className="card-text">Rocket Name: {rocket.rocket.rocket_name}</p>
                            <p className="card-text">Launch Date: {rocket.launch_date_local}</p>
                            <p className="card-text">Launch Status: {rocket.launch_success}</p>

                        </div>
                    </div>
                </div>
            </div>
        )
    )
}
