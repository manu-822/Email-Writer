package com.email.writer.app;


public class EmailRequest 
{
	private String emailContent;  // content of the mail that we are crafting a reply for.
	private String tone;  // specifies how we want our reply to sound
	
	public EmailRequest() {}

    public EmailRequest(String emailContent, String tone) 
    {
        this.emailContent = emailContent;
        this.tone = tone;
    }
	
	public String getEmailContent() {
		return emailContent;
	}
	public void setEmailContent(String emailContent) {
		this.emailContent = emailContent;
	}
	public String getTone() {
		return tone;
	}
	public void setTone(String tone) {
		this.tone = tone;
	}
	
	@Override
    public String toString() {
        return "EmailRequest{" +
                "emailContent='" + emailContent + '\'' +
                ", tone='" + tone + '\'' +
                '}';
    }
}
