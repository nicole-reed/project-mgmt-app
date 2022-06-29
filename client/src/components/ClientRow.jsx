import { FaTrash } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { DELETE_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';
import { GET_PROJECTS } from '../queries/projectQueries';

export default function ClientRow({ client }) {
    const [deleteClient] = useMutation(DELETE_CLIENT, {
        variables: { id: client.id },
        // To update the list of clients we can either refetch the queries (but this might bog down app)
        // using refetch in this scenario so that it updates the page 
        refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
        // OR we can update the cache setting the data as the response from deleteClient
        // update(cache, { data: { deleteClient } }) {
        //     const { clients } = cache.readQuery({ query: GET_CLIENTS });
        //     cache.writeQuery({
        //         query: GET_CLIENTS,
        //         // Set data to the clients who dont match the deleted client's id
        //         data: { clients: clients.filter(client => client.id !== deleteClient.id) },
        //     })
        // }
    });

    return (
        <tr>
            <td>{client.name}</td>
            <td>{client.email}</td>
            <td>{client.phone}</td>
            <td>
                <button className='btn btn-danger btn-sm' onClick={deleteClient}>
                    <FaTrash />
                </button>
            </td>
        </tr>
    )
}
