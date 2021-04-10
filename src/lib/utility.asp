<%

Public Function getJsonFromReq
    If Request.ServerVariables("CONTENT_TYPE") = "application/json" Then
        bytecount = Request.TotalBytes
        bytes = Request.BinaryRead(bytecount)        
        getJsonFromReq = convertByteToString(bytes)
    End If
End Function

Public Function convertByteToString(bytes)
    Set stream = Server.CreateObject("ADODB.Stream")
        stream.Type = 1 'adTypeBinary              
        stream.Open()                                   
            stream.Write(bytes)
            stream.Position = 0                             
            stream.Type = 2 'adTypeText                
            stream.Charset = "utf-8"                      
            convertByteToString = stream.ReadText() 'here is your json as a string                
        stream.Close()
    Set stream = nothing
End Function


Function Base64Encode(sText)
    Dim oXML, oNode
    Set oXML = CreateObject("Msxml2.DOMDocument.3.0")
    Set oNode = oXML.CreateElement("base64")
    oNode.dataType = "bin.base64"
    oNode.nodeTypedValue = Stream_StringToBinary(sText)
    Base64Encode = oNode.text
    Set oNode = Nothing
    Set oXML = Nothing
End Function

Function Base64Decode(text)
    Dim oXML, oNode
    Set oXML = CreateObject("Msxml2.DOMDocument.3.0")
    Set oNode = oXML.CreateElement("base64")
    oNode.dataType = "bin.base64"
    oNode.text = text
    Base64Decode = Stream_BinaryToString(oNode.nodeTypedValue)
    Set oNode = Nothing
    Set oXML = Nothing
End Function

Function Stream_StringToBinary(Text)
	Const adTypeText = 2
	Const adTypeBinary = 1
	Dim BinaryStream 'As New Stream
	Set BinaryStream = CreateObject("ADODB.Stream")
		BinaryStream.Type = adTypeText
		BinaryStream.CharSet = "us-ascii"
		BinaryStream.Open
		BinaryStream.WriteText Text
		BinaryStream.Position = 0
		BinaryStream.Type = adTypeBinary
		BinaryStream.Position = 0
	Stream_StringToBinary = BinaryStream.Read
	Set BinaryStream = Nothing
End Function

Function Stream_BinaryToString(Binary)
	Const adTypeText = 2
	Const adTypeBinary = 1
	Dim BinaryStream 'As New Stream
	Set BinaryStream = CreateObject("ADODB.Stream")
		BinaryStream.Type = adTypeBinary
		BinaryStream.Open
		BinaryStream.Write Binary
		BinaryStream.Position = 0
		BinaryStream.Type = adTypeText
		BinaryStream.CharSet = "us-ascii"
	
	Stream_BinaryToString = BinaryStream.ReadText
  	Set BinaryStream = Nothing
End Function

%>

