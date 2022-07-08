import {gql} from '@apollo/client';
export const CREATE_USER = gql`
mutation createUser($fname:String!,$lname:String!,$email:String!,$empd_ID:String!,$designation:String!){
    createUser(fname:$fname,lname:$lname,email:$email,empd_ID:$empd_ID,designation:$designation){
        success,
        error,
        message
    }
}
`