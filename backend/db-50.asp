<%
    session.codepage=65001
    
    SET conn = SERVER.CREATEOBJECT("ADODB.CONNECTION")	    
    conn.open "Provider=SQLOLEDB.1;Data Source=10.10.99.50;Initial Catalog=MainOnline;User ID=k2user;Pwd=password"	

%>