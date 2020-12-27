const { query } = require('../../helper')

async function addDocument(ISBN, docName, publisherName) {
    await query(`CALL add_document('${ISBN}', '${docName}', '${publisherName}');`)
    console.log('addDocument')
}

async function listDocument(semester, faculty){
    const rows = await query(`CALL LIST_DOCUMENT('${semester}', '${faculty}');`)
    console.log('listDocument')
    return rows[0]
}

async function updateDocument(ISBN, docName, publisherName){
    await query(`CALL update_document('${ISBN}', '${docName}', '${publisherName}');`)
    console.log('updateDocument')
}

async function deleteDocument(ISBN){
    await query(`CALL delete_document('${ISBN}');`)
    console.log('deleteDocument')
}

async function viewAssignedDocument(){
    const rows = await query(`CALL getAssignedDocument();`)
    console.log('viewAssignedDocument')
    return rows[0]
}

module.exports = {
    addDocument,
    listDocument,
    updateDocument,
    deleteDocument,
    viewAssignedDocument
}