<!--#include file = "../../src/lib/utility.asp"-->
<!--#include file = "../../src/lib/aspJSON1.19.asp"-->
<!--#include file = "../db-50.asp"-->
<%

    JsonStr = getJsonFromReq()
 
    On Error Resume Next
    
    Set oJSON = New aspJSON
    oJSON.loadJSON(JsonStr)

    approverID = ""

    If Err.Number <> 0 Then
        Response.Write(500)
        On Error Goto 0 
    Else
        approver = Base64Decode(oJSON.data("approver")) 
        approveSplit = Split(approver,";")
        s
        for each user in approveSplit
            If user <> "" Then

                sql = "SELECT [EI_EmployeeID] FROM [MainOnline].[dbo].[MA_EffectiveUser] WHERE [Username] = '" & user & "'"
                SET row = conn.execute(sql)	
                approverID = approverID & "[" & row("EI_EmployeeID") & "] "
            End If
        next


    End If

    Response.Write(approverID)
    
%>