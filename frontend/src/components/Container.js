import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import moment from "moment"

const Container = () => {
    const { containerName } = useParams()
    const [container, setContainer] = useState()

    
    useEffect(() => {
        const getContainer = async () => {
            const res = await axios.get(`/containers/${containerName}`)
            setContainer(res.data)
        }
        getContainer()
    }, [containerName])
    
    return (
        <div>
            <h1>Container Details</h1>

            {container === undefined ? 
                <div className="spinner-border"></div> 
            :
                <div>
                    <div>
                        <h2>Actions</h2>
                        <button>Start</button>
                        <button>Stop</button>
                        <button>Remove</button>
                    </div>

                    <div class="col-sm-6">

                        <table className="table table-bordered">
                            <thead className="table-dark">
                                <tr>
                                    <th colSpan={2}>Container status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>ID</td>
                                    <td>{container.Id}</td>
                                </tr>
                                <tr>
                                    <td>Name</td>
                                    <td>{container.Name.substring(1)}</td>
                                </tr>
                                <tr>
                                    <td>IP address</td>
                                    <td>{container.NetworkSettings.IPAddress || "-"}</td>
                                </tr>
                                <tr>
                                    <td>Status</td>
                                    <td>{container.State.Status}</td>
                                </tr>
                                <tr>
                                    <td>Created</td>
                                    <td>{moment(container.Created).format("YYYY-MM-DD HH:mm:ss")}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="col-sm-6">
                        <table className="table table-bordered">
                            <thead className="table-dark">
                                <tr>
                                    <th colSpan={3}>Container details</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>IMAGE</td>
                                    <td colSpan={2}>{`${container.Config.Image}@${container.Image}`}</td>
                                </tr>
                                <tr>
                                    <td>CMD</td>
                                    <td colSpan={2}>{container.Config.Cmd  ? container.Config.Cmd[0] : "-"}</td>
                                </tr>
                                <tr>
                                    <td>ENTRYPOINT</td>
                                    <td colSpan={2}>{container.Config.Entrypoint ? container.Config.Entrypoint[0] : "-"}</td>
                                </tr>
                                {container.Config.Env.length > 1 &&
                                    <>
                                        <tr>
                                            <td rowSpan={container.Config.Env.length + 1}>ENV</td>
                                        </tr>
                                        {container.Config.Env.map(env => {
                                            const [k, v] = env.split("=")
                                            return (
                                                <tr>
                                                    <td>{k}</td>
                                                    <td>{v}</td>
                                                </tr>
                                            )
                                        })}
                                    </>
                                }
                            </tbody>
                        </table>
                    </div>

                    <div class="col-sm-6">
                         <table className="table table-bordered">
                            <thead >
                                <tr className="table-dark">
                                    <th colSpan={2}>Volumes</th>
                                </tr>
                                <tr className="table-light">
                                    <th>Host/volume	</th>
                                    <th>Path in container</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>ID</td>
                                    <td>{container.Id}</td>
                                </tr>
                                <tr>
                                    <td>Name</td>
                                    <td>{container.Name.substring(1)}</td>
                                </tr>
                                <tr>
                                    <td>IP address</td>
                                    <td>{container.NetworkSettings.IPAddress || "-"}</td>
                                </tr>
                                <tr>
                                    <td>Status</td>
                                    <td>{container.State.Status}</td>
                                </tr>
                                <tr>
                                    <td>Created</td>
                                    <td>{moment(container.Created).format("YYYY-MM-DD HH:mm:ss")}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>  

                    {container.Mounts.length !== 0 && 
                        <div class="col-sm-6">
                            <table className="table table-bordered">
                            <thead >
                                <tr className="table-dark">
                                    <th colSpan={2}>Volumes</th>
                                </tr>
                                <tr className="table-light">
                                    <th>Host/volume	</th>
                                    <th>Path in container</th>
                                </tr>
                            </thead>
                            <tbody>
                                {container.Mounts.map(mount => {
                                    if(mount.Type === "volume") {
                                        return (
                                            <tr>
                                                <td>{mount.Name}</td>
                                                <td>{mount.Destination}</td>
                                            </tr>
                                        )
                                    } else {
                                        return (
                                            <tr>
                                                <td>{mount.Source}</td>
                                                <td>{mount.Destination}</td>
                                            </tr>
                                        )
                                    }
                                })}
                            </tbody>
                        </table>
                    </div>  
                    }
                </div>
            }
        </div>
    )
}

export default Container