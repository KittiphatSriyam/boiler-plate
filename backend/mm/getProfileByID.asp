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
        sql = "SELECT [Username] , [EI_SectionShort] , [EI_CompanyCode] FROM [MainOnline].[dbo].[MA_EffectiveUser] WHERE [EI_EmployeeID] = '" & oJSON.data("empID") & "'"
        SET row = conn.execute(sql)	
        Json_res = Json_res & "{"
        Json_res = Json_res & """username"" : """ &  Replace(row("Username"), "\", "\\") & ""","
        Json_res = Json_res & """company"" : """ &  row("EI_CompanyCode") & ""","
        Json_res = Json_res & """section"" : """ &  row("EI_SectionShort") & """"
        Json_res = Json_res & "}"
    End If

    Response.Write(Json_res)
    
%>