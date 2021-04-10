<!--#include file = "../../src/lib/utility.asp"-->
<!--#include file = "../../src/lib/aspJSON1.19.asp"-->
<!--#include file = "../db-50.asp"-->
<%
    JsonStr = getJsonFromReq()
 
    On Error Resume Next
    
    Set oJSON = New aspJSON
    oJSON.loadJSON(JsonStr)

    Json_res = ""
    
    If Err.Number <> 0 Then
        Response.Write(500)
        On Error Goto 0 
    Else        

        sql = "SELECT * FROM [SmartBox].[dbo].[MMUsers] WHERE [MM_IDUser] = '" & oJSON.data("empID") & "'"
        SET row = conn.execute(sql)	

        Json_res = Json_res & "{"
        Json_res = Json_res & """company"" : """ & row("MM_Company") & ""","
        Json_res = Json_res & """empID"" : """ & row("MM_IDUser") & ""","
        Json_res = Json_res & """username"" : """ & Base64Encode(row("MM_User")) & ""","
        Json_res = Json_res & """approver"" : """ & Base64Encode(row("MM_Approver")) & """"
       Json_res = Json_res & "}"

    End If
    Response.Write(Json_res)
    
%>