<!--#include file = "../../src/lib/utility.asp"-->
<!--#include file = "../../src/lib/aspJSON1.19.asp"-->
<!--#include file = "../db-50.asp"-->
<%
    JsonStr = getJsonFromReq()
 
    On Error Resume Next
    
    Set oJSON = New aspJSON
    oJSON.loadJSON(JsonStr)

    If Err.Number <> 0 Then
        Response.Write(500)
        On Error Goto 0 
    Else        

        username = LCase(convertEmpIdToUsername(oJSON.data("empID")))
        approveTemp = LCase(oJSON.data("approver"))
       
        approveSplit = Split(approveTemp,";")
        userApprover = ""
        loopNo = 0
        for each id in approveSplit
            If id <> "" Then
                temp = LCase(convertEmpIdToUsername(id))
                userApprover = userApprover & temp & ";"
                loopNo = loopNo + 1
            End If
        next
        
        If loopNo = 1 Then
            userApprover = Replace(userApprover,";", "")
        End If

        sql = "SELECT MM_IDUser FROM [SmartBox].[dbo].[MMUsers] WHERE [MM_IDUser] = '" & oJSON.data("empID") & "'"
        SET row = conn.execute(sql)	

        If row("MM_IDUser") = "" Then      
            sql = "INSERT INTO [SmartBox].[dbo].[MMUsers] ([MM_Company],[MM_IDUser],[MM_User],[MM_Approver]) "
            sql = sql & " VALUES ('" & oJSON.data("company") & "', '" & oJSON.data("empID") & "' , '" & username & "' , '" & userApprover & "')"
            
            On Error Resume Next
            conn.execute(sql)
           
            If Err.Number <> 0 Then
                Response.Write(500)
                On Error Goto 0 
            Else   
                Response.Write(200)
            End If
        Else	
  
            sql = "UPDATE [SmartBox].[dbo].[MMUsers] SET  "
            sql = sql & " [MM_Company] = '" & oJSON.data("company") & "' , "
            sql = sql & " [MM_IDUser] = '" & oJSON.data("empID") & "' , "
            sql = sql & " [MM_User] = '" & username & "' ,"
            sql = sql & " [MM_Approver] = '" & userApprover & "' "
            sql = sql & " WHERE [MM_IDUser] = '" & oJSON.data("empID") & "'"

            On Error Resume Next
            conn.execute(sql)
           
            If Err.Number <> 0 Then
                Response.Write(500)
                On Error Goto 0 
            Else   
                Response.Write(200)
            End If

        End If


    End If

    Public Function convertEmpIdToUsername(empID)
        sql = "SELECT [Username] FROM [MainOnline].[dbo].[MA_EffectiveUser] WHERE [EI_EmployeeID] = '" & empID & "'"
        SET row = conn.execute(sql)	
        convertEmpIdToUsername = row("Username")
    End Function
%>