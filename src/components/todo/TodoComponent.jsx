import {useParams} from "react-router-dom";
import {getTodoByUsernameAndIdApi} from "./api/ToDoApiService";
import {useAuth} from "./security/AuthContext";
import {useEffect, useState} from "react";
import {Form, Field, Formik} from 'formik'

export default function TodoComponent() {

    const authContext = useAuth()
    const username = authContext.username

    const {id} = useParams()

    const [description, setDescription] = useState('')
    const [targetDate, setTargetDate] = useState('')


    useEffect(
        (username, id) => retrieveTodos(),
    )

    function retrieveTodos() {
        getTodoByUsernameAndIdApi(username, id)
            .then(responce => {
                setDescription(responce.data.description)
                setTargetDate(responce.data.targetDate)
            })
            .catch(error => console.log(console.log(error)))
    }

    function onSubmit(values) {
        console.log(values)
    }

    return (
        <div className='container'>
            <h1>Enter Todo Details</h1>
            <div>
                <Formik initialValues={{description,targetDate}}
                    enableReinitialize={true}
                    onSubmit={onSubmit}
                >
                    {
                        (props) => (
                            <Form>
                                <fieldset className='form-group'>
                                    <label>Description</label>
                                    <Field type="text" className="form-control" name="description"/>
                                </fieldset>

                                <fieldset className='form-group'>
                                    <label>Target Date</label>
                                    <Field type="date" className="form-control" name="targetDate"/>
                                </fieldset>

                                <div>
                                    <button className='btn btn-success m-5' type="submit">Save</button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}